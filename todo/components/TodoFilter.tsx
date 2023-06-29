import React from "react"

interface Props {
	filter?: string | number | readonly string[]
	setFilter: Function
	options: Array<any>
}

const TodoFilter: React.FC<Props> = ({ filter, setFilter, options }) => {
	const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilter(e.target.value)
	}

	let content = options.map(option => {
		return (
			<option key={option} className="hover:bg-item" value={option}>
				{option}
			</option>
		)
	})

	return (
		<div className="flex bg-primary rounded-lg w-[100%] py-[0.55rem] pl-2 pr-1">
			<select
				defaultValue={filter}
				onChange={e => onChangeHandler(e)}
				className="bg-primary outline-none text-gray-400 border-none rounded-lg w-[100%]"
			>
				{content}
			</select>
		</div>
	)
}

export default TodoFilter
