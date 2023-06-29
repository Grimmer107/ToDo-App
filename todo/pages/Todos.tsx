import React, { useState } from "react"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import { useRouter } from "next/router"
import ClipLoader from "react-spinners/ClipLoader"
import { TodoContext } from "@/context/TodoContext"
import TodosList from "@/components/TodosList"
import TodoCreate from "@/components/TodoCreate"
import TodoFilter from "@/components/TodoFilter"
import TodoSearch from "@/components/TodoSearch"
import Header from "@/components/Header"

import getTodosValidate from "@/Schema/getTodos"

export default function Todo() {
	const [filter, setFilter] = useState("None")
	const [search, setSearch] = useState("")
	const router = useRouter()
	const { data: session, status } = useSession()

	const fetcher = (...args: any) => fetch(args).then(res => res.json())
	const { data, mutate, error, isLoading } = useSWR(
		status === "authenticated"
			? `${process.env.API_URL}/todo?email=${
					session?.user?.email
			  }&name=${localStorage.getItem("listname")}`
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

	if (data) {
		const valid = getTodosValidate(data)
		if (!valid) {
			return (
				<div>
					<p>Validation Error in GET:</p>
					<>{getTodosValidate.errors}</>
				</div>
			)
		}
	}

	return (
		<div className="p-0">
			<Header email={session?.user?.email as String} />
			<div className="bg-background p-2 m-auto w-1/2 h-screenset rounded-lg overscroll-none">
				<TodoCreate setUpdate={mutate} />
				<div className="w-5/6 px-3 flex justify-between m-auto mt-2">
					<TodoSearch search={search} setSearch={setSearch} />
					<TodoFilter
						options={["Completed", "Not Completed", "None"]}
						filter={filter}
						setFilter={setFilter}
					/>
				</div>
				<div className="mt-2 h-5/6">
					<TodoContext.Provider value={mutate}>
						<TodosList
							data={data}
							error={error}
							isLoading={isLoading}
							filter={filter}
							search={search}
						/>
					</TodoContext.Provider>
				</div>
			</div>
			<button
				onClick={() => router.back()}
				className="text-white bg-primary rounded-lg ml-4 text-sm py-3 px-4"
			>
				Go Back
			</button>
		</div>
	)
}
