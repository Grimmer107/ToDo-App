import React, { useState, useContext } from "react"
import { Todo } from "@/utils/types"
import { TodoContext } from "@/context/TodoContext"
import TodoDelete from "./TodoDelete"

const TodoItem: React.FC<Todo> = props => {
	const [todoComplete, setTodoComplete] = useState(props.completed)
	const [todoDelete, setTodoDelete] = useState(false)
	const mutate = useContext(TodoContext)

	const toggleComplete = async (event: any) => {
		setTodoComplete(prevstate => !prevstate)
		await fetch(`${process.env.API_URL}/todo/${props._id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				_id: props._id,
				task: props.task,
				completed: event.target.checked
			})
		})
		mutate && mutate()
	}

	return !todoDelete ? (
		<div
			key={props._id}
			className="bg-item mt-4 w-5/6 m-auto rounded-md p-4 text-gray-300 flex justify-between"
		>
			<div className="relative flex">
				<input
					checked={todoComplete}
					id="checked-checkbox"
					type="checkbox"
					className="w-4 h-4 mt-1 text-blue-600 rounded-md outline-none"
					onChange={toggleComplete}
				/>
				<p className="text-md overflow-auto ml-2">{props.task}</p>
			</div>
			<TodoDelete setTodoDelete={setTodoDelete} id={props._id} />
		</div>
	) : null
}

export default TodoItem
