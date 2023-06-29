import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../utils/connect";
import { List } from "@/utils/types";
import postValidate from "@/Schema/postTodoList";
import deleteListValidate from "@/Schema/deleteTodoList";

export const getTodoLists = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { User } = await connect()
        const user = await User.find({email: req.query.email}).populate('lists')
        const lists = user[0].lists
        res.json(lists)
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const postTodoList = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const valid = postValidate(req.body)
    if (!valid) {
        console.log("PostValidate Error", postValidate.errors)
        res.status(400).json({ errors:postValidate.errors })
    }

    try {
        const { User, List } = await connect()
        const user = await User.find({email: req.query.email}).populate('lists')
        const lists = user[0].lists
        const newList = await List.create({ name: req.body.name, todos: [], status: "Private" })
        await newList.save()
        lists.push(newList)
        user[0].save()
        res.json(lists)
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const getTodoList = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { List, User } = await connect()
        const user = await User.find({email: req.query.email})
        const id: string = req.query.id as string
        const todo = await List.findById(id)
        res.json(todo)
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const deleteTodoList = async (req: NextApiRequest, res: NextApiResponse) => {

    const valid = deleteListValidate(req.body)
    if (!valid) {
        console.log("deleteListValidate Error", deleteListValidate.errors)
        res.status(400).json({ errors:deleteListValidate.errors })
    }

    try {
        const { User, List } = await connect()
        const user = await User.find({email: req.query.email}).populate({path:'lists'})
        const lists = user[0].lists
        const newListSet = lists.filter((list:List) => {
            return list._id?.toString() !== req.body._id
        })
        user[0].lists = [...newListSet]
        await user[0].save()
        const listToDelete = await List.findByIdAndRemove(req.body._id)
        res.json(user[0])
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const changeStatusList = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { List } = await connect()
        let selected_list = await List.find({_id: req.body._id})
        const list = selected_list[0]
        list.status = req.body.status
        await list.save()
        res.json(list)
    } catch (error) {
        res.status(400).json({ error })
    }
}