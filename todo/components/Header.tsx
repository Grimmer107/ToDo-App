import React from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { signOut } from "next-auth/react"

type Props = { email: String }

const Header: React.FC<Props> = ({ email }) => {
	const router = useRouter()

	return (
		<div>
			<Head>
				<title>ToDo App</title>
				<meta name="description" content="Todo list App" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.svg" sizes="any" />
			</Head>
			<div className="bg-primary h-10 flex justify-between align-middle mb-6 py-0.5 px-4">
				<div className="my-auto flex ml-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="white"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6 my-auto"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
						/>
					</svg>
					<p className="text-sm text-white font-semibold my-auto ml-2">
						TodoList
					</p>
				</div>
				<div className="flex align-middle mr-8">
					<p className="text-sm text-white m-auto mr-4">{email}</p>
					<button
						onClick={async () => {
							await signOut()
							await router.push("http://localhost:3000")
						}}
						className="text-sm text-white hover:font-semibold w-20"
					>
						Sign out
					</button>
				</div>
			</div>
		</div>
	)
}

export default Header
