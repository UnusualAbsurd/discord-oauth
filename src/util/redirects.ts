import { GetServerSidePropsContext } from "next";
import { Session } from "next-iron-session";
import { User } from "src/types";

export async function developerRoute(
  ctx: GetServerSidePropsContext & { req: { session: Session } }
) {
  const user: User | undefined = ctx.req.session.get("user");

  if(!user) {
      return {
          props: user ? { user } : {}
      }
  }

  if (user) {
    return {
      props: user ? { user } : {},
    };
  }
}
