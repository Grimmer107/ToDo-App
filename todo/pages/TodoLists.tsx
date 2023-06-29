import React, { useState } from "react"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import ClipLoader from "react-spinners/ClipLoader"
import TodoListCreate from "@/components/TodoListCreate"
import TodoFilter from "@/components/TodoFilter"
import TodoItemList from "@/components/TodoItemList"
import Header from "@/components/Header"
import { List } from "@/utils/types"
import { TodoContext } from "@/context/TodoContext"

export default function Home() {
	const [filter, setFilter] = useState("None")
	const { data: session, status } = useSession()

	const fetcher = (...args: any) => fetch(args).then(res => res.json())
	const { data, mutate, error, isLoading } = useSWR(
		status === "authenticated"
			? `${process.env.API_URL}/list?email=${session?.user?.email}`
			: null,
		fetcher,
		{ suspense: true }
	)

	if (status === "loading") {
		return (
			<div className="m-auto w-[100%] h-[100vh] flex">
				<ClipLoader
					color={"black"}
					loading={true}
					cssOverride={{ margin: "auto" }}
					size={150}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			</div>
		)
	}

	if (status === "unauthenticated") {
		return (
			<div className="m-auto w-5/6 h-screenset text-center">
				Access Denied
			</div>
		)
	}

	if (error) {
		return <p>{error}</p>
	}

	let content
	if (data) {
		if (filter !== "None") {
			let filtertype = filter === "Private" ? "Private" : "Public"
			content = data.filter((item: List) => {
				return item.status === filtertype
			})
		} else {
			content = [...data]
		}
		content = content.map((item: List) => {
			return <TodoItemList key={item.name} props={item} />
		})
	} else {
		content = isLoading
	}

	return (
		<div className="p-0 relative">
			<Header email={session?.user?.email as String} />
			<div className="bg-background p-1 m-auto w-1/2 h-screenset rounded-lg overscroll-none">
				<TodoListCreate setUpdate={mutate} />
				<div className="flex justify-between m-auto p-0.5 pl-2 w-5/6 mt-0.5 px-2">
					<p className="text-xs text-gray-500 font-bold my-auto pl-4">
						TODO LISTS
					</p>
					<TodoFilter
						options={["Public", "Private", "None"]}
						filter={filter}
						setFilter={setFilter}
					/>
				</div>
				<TodoContext.Provider value={mutate}>
					<div className="overflow-auto h-5/6 scrollbar-thin scrollbar-thumb-primary scrollbar-track-item">
						{content}
					</div>
				</TodoContext.Provider>
			</div>
		</div>
	)
}
