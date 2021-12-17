import {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse,
} from "next";
import { withIronSession, Session } from "next-iron-session";

export type NextIronRequest = NextApiRequest & { session: Session };
export type NextIronHandler = (
	req: NextIronRequest,
	res: NextApiResponse
) => void | Promise<void>;

export type NextRoute = (
	ctx: GetServerSidePropsContext & { req: { session: Session } },
	redirect: string
) => any;

export function withSession(handler: NextIronHandler | NextRoute) {
	return withIronSession(handler, {
		password: process.env.COOKIE_SECRET as string,
		cookieName: "session",
		ttl: 15 * 24 * 3600,
		cookieOptions: {
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			httpOnly: true,
		},
	});
}
