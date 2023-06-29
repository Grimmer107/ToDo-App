import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../utils/connect";
import { List, Todo } from "@/utils/types";
import postValidate from "@/Schema/postTodo";
import deleteValidate from "@/Schema/deleteTodo";
import putValidate from "@/Schema/putTodo";

export const getTodos = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { User } = await connect()
        const email = req.query.email
        const listname = req.query.name
        const user = await User.find({email: email}).populate({
            path: 'lists',
            populate: {
                path: 'todos'
            }
        })
        let selectedlist = user[0].lists.filter((list:List) => {
            return list.name === listname
        })
        res.json(selectedlist[0].todos)
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
        const { Todo, User } = await connect()
        const email = req.query.email
        const listname = req.query.name
        const user = await User.find({email: email}).populate({path: 'lists'})
        let selectedlist = user[0].lists.filter((list:List) => {
            return list.name === listname
        })
        const newTodo = await Todo.create({ task: req.body.task, completed: false})
        let allTodos = [...selectedlist[0].todos]
        selectedlist[0].todos = [...allTodos, newTodo]
        await selectedlist[0].save()
        await user[0].save()
        res.json(newTodo)
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
        const { Todo, List } = await connect()
        const id: string = req.query.id as string
        const list = await List.findById(req.body.list_id).populate({ path: 'todos'})

        let newTodo = list.todos.filter((todo:Todo) => {
            return todo._id?.toString() !== id
        })
        list.todos = [...newTodo]
        await list.save()
        const todos = await Todo.findByIdAndRemove(id)
        res.json(list)
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const markCompleted = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const valid = putValidate(req.body)
    if (!valid) {
        console.log("PutValidate Error", putValidate.errors)
        res.status(400).json({ errors:deleteValidate.errors })
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