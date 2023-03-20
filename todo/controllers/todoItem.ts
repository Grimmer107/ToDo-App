import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../utils/connect";
import postValidate from "@/Schema/postTodo";
import deleteValidate from "@/Schema/deleteTodo";
import putValidate from "@/Schema/putTodo";

export const getTodos = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { Todo } = await connect()
        const todos = await Todo.find({})
        res.json(todos)
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const postTodo = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const valid = postValidate(req.body)
    if (!valid) {
        console.log("PostValidate Error", postValidate.errors)
        res.status(400).json({ errors:postValidate.errors })
    }
    
    try {
        const { Todo } = await connect()
        const new_todo = await Todo.create(req.body)
        res.json(new_todo)
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const getTodo = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { Todo } = await connect()
        const id: string = req.query.id as string
        const todo = await Todo.findById(id)
        res.json(todo)
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const deleteTodo = async (req: NextApiRequest, res: NextApiResponse) => {

    const valid = deleteValidate(req.body)
    if (!valid) {
        console.log("DeleteValidate Error", deleteValidate.errors)
        res.status(400).json({ errors:deleteValidate.errors })
    }

    try {
        const { Todo } = await connect()
        const id: string = req.query.id as string
        const todos = await Todo.findByIdAndRemove(id)
        res.json(todos)
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const markCompleted = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const valid = putValidate(req.body)
    if (!valid) {
        console.log("PutValidate Error", putValidate.errors)
        res.status(400).json({ errors:putValidate.errors })
    }

    try {
        const { Todo } = await connect()
        const id: string = req.query.id as string
        const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true })
        res.json(todo)
    } catch (error) {
        res.status(400).json({ error })
    }
}