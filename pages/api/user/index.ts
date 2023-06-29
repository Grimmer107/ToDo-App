import { NextApiRequest, NextApiResponse } from "next";
import { postUser, getUser } from "@/controllers/userAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
    switch (req.method) {
        case 'GET':
            getUser(req, res)
            break;
        case 'POST':
            postUser(req, res)
            break;
        default:
            res.status(400).json({ error: "Invalid Request" })
    }
}

export default handler;