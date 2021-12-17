import { NextApiResponse } from "next";
import { NextIronRequest, withSession } from "../../../util/session";

const OAuthScope = ["identify"].join(" ");
const OAuthData = new URLSearchParams({
  response_type: "code",
  client_id: process.env.CLIENT_ID as string,
  redirect_uri: `${process.env.DOMAIN}/api/auth/callback`,
  scope: OAuthScope,
});

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
  res.redirect(`https://discordapp.com/oauth2/authorize?${OAuthData}`);
};

export default withSession(handler);
