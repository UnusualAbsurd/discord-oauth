import { NextApiResponse } from "next";
import { stringify } from "querystring";
import { NextIronRequest, withSession } from "../../../util/session";
import axios from "axios";
import { dbConnect } from "../../../util/mongodb";
import { decrypt, encrypt } from "../../../util/crypt";

const OAuthScope = ["identify", "email"].join(" ");

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
  const { db } = await dbConnect();

  if (!req.query.code) {
    res.status(404).redirect("/404");
    return;
  }

  try {
    const { data } = await axios.post(
      "https://discordapp.com/api/v9/oauth2/token",
      stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: `${process.env.DOMAIN}/api/auth/callback`,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (data.scope !== OAuthScope) {
      return res
        .status(403)
        .send(
          `Expected scope "${OAuthScope}" but received scope "${data.scope}"`
        );
    }

    const { data: user } = await axios.get(
      "https://discordapp.com/api/v9/users/@me",
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );

    if (user.email === null) {
      return res
        .status(400)
        .send("Please verify your Discord's account E-mail before logging in.");
    }

    const exists = await db
      .collection("users")
      .countDocuments({ _id: user.id });

    if (exists) {
      db.collection("users").updateOne(
        { _id: user.id },
        {
          $set: {
            email: user.email,
            name: user.username,
            discriminator: user.discriminator,
            avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
          },
          $addToSet: {
            ip: req.headers["cf-connecting-ip"],
          },
        }
      );
    } else {
      db.collection("users").insertOne({
        _id: user.id,
        email: user.email,
        name: user.username,
        discriminator: user.discriminator,
        avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
        ip: [req.headers["cf-connecting-ip"]],
      });
    }

    const staffUser = await db.collection("staff").findOne({ _id: user.id });

    if (staffUser) {
      db.collection("staff").updateOne(
        { _id: user.id },
        {
          $set: {
            avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
          },
        }
      );
    }

    await req.session.set("user", {
      ...user,
      token: encrypt(user.id),
      avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
    });
  } catch (e) {
    res.redirect("/r?true");
    return;
  }

  await req.session.save();
  res.redirect("/?r=true");
};

export default withSession(handler);
