import React, { useContext } from "react"
import { useSession } from "next-auth/react"
import { TodoContext } from "@/context/TodoContext"

interface Props {
	_id: String
	status: String
	setStatus: Function
}

const TodoListShare: React.FC<Props> = ({ _id, status, setStatus }) => {
	const { data: session } = useSession()
	const mutate = useContext(TodoContext)

	const onShareHandler = async () => {
		await fetch(
			`${process.env.API_URL}/list/${_id}?email=${session?.user?.email}`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					_id: _id,
					status: status === "Private" ? "Public" : "Private"
				})
			}
		)
		setStatus((prevState: String) => {
			return prevState === "Public" ? "Private" : "Public"
		})
		mutate && mutate()
	}

	return (
		<>
			<svg
				onClick={onShareHandler}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill={status === "Public" ? "green" : "white"}
				className="w-5 h-5 m-auto mr-4 cursor-pointer hover:text-bold hover:fill-green-700"
			>
				<path
					fillRule="evenodd"
					d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
					clipRule="evenodd"
				/>
			</svg>
		</>
	)
}

export default TodoListShare
