import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../utils/connect";
import { User, List } from "@/utils/types";

export const getTodoLists = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { User } = await connect()
        const user = await User.find({email: req.query.email})
        res.json(user)
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const postTodoList = async (req: NextApiRequest, res: NextApiResponse) => {
    
    try {
        const { List, Todo } = await connect()
        const new_todo = await Todo.create(req.body)
        res.json(new_todo)
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

    try {
        const { Todo } = await connect()
        const id: string = req.query.id as string
        const todos = await Todo.findByIdAndRemove(id)
        res.json(todos)
    } catch (error) {
        res.status(400).json({ error })
    }
}