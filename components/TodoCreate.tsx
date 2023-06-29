import React, { useRef } from "react"
import { useSession } from "next-auth/react"

interface Props {
	setUpdate: Function
}

const TodoCreate: React.FC<Props> = ({ setUpdate }) => {
	const { data: session } = useSession()
	const inputRef = useRef<HTMLInputElement>(null)

	const onClickHandle = async () => {
		if (inputRef.current && inputRef.current.value !== "") {
			await fetch(
				`${process.env.API_URL}/todo?email=${
					session?.user?.email
				}&name=${localStorage.getItem("listname")}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						task: inputRef.current.value,
						completed: false
					})
				}
			)
			inputRef.current.value = ""
			setUpdate()
		}
	}

	return (
		<div className="w-5/6 h-12 py-4 px-8 mt-8 mb-2 bg-primary m-auto rounded-full flex align-middle justify-between relative">
			<input
				ref={inputRef}
				type="text"
				name="newTodo"
				placeholder="Add Item"
				className=" w-5/6 bg-transparent text-gray-300 font-semibold border-none outline-none text-md"
			/>
			<button
				onClick={onClickHandle}
				className="bg-secondary w-8 h-8 m-0 rounded-full p-0 text-center font-bold text-white text-xl absolute top-2 right-3"
			>
				+
			</button>
		</div>
	)
}

export default TodoCreate
