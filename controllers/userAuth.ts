import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../utils/connect";

export const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { User } = await connect()
        const user = await User.find({email: req.query.email})
        res.json(user)
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const postUser = async (req: NextApiRequest, res: NextApiResponse) => {    
    try {
        const { User } = await connect()
        const new_user = await User.create({email: req.body.email, password: req.body.password, lists: [] })
        res.json(new_user)
    } catch (error) {
        res.status(400).json({ error })
    }
}