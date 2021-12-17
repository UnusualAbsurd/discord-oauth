import { NextApiResponse } from "next";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	req.session.destroy();

	res.redirect(`/`);
};

export default withSession(handler);
