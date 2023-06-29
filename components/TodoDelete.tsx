import React from "react"

const TodoDelete = (props: any) => {
	const ondeleteHandle = async () => {
		await fetch(`${process.env.API_URL}/todo/${props.id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				_id: props.id,
				list_id: localStorage.getItem("listID")
			})
		})
		let TodoDelete = props.setTodoDelete
		TodoDelete(true)
	}

	return (
		<div className="cursor-pointer" onClick={ondeleteHandle}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="white"
				className="w-6 h-6 hover:stroke-red-700"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</div>
	)
}

export default TodoDelete
