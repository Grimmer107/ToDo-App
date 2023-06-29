import React from "react"

interface Props {
	search: String | any
	setSearch: Function
}

const TodoSearch: React.FC<Props> = ({ search, setSearch }) => {
	return (
		<div className="flex align-middle">
			<p className="text-gray-400 h-10 md:w-[10%] hidden lg:block text-centre text-md px-1 py-2.5 md:mr-2">
				Search
			</p>
			<input
				value={search}
				onChange={e => setSearch(e.target.value)}
				placeholder={"Enter search string..."}
				className="bg-primary w-[90%] px-4 py-2 text-white text-md rounded-lg ml-4 outline-none overflow-hidden"
			/>
		</div>
	)
}

export default TodoSearch
