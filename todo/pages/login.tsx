import React, { useRef } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"

const Index = () => {
	const router = useRouter()
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const onClickHandle = async () => {
		if (emailRef.current && passwordRef.current) {
			const res = await signIn("credentials", {
				redirect: false,
				email: emailRef.current.value,
				password: passwordRef.current.value
			})

			if (res && res.ok) {
				router.push("http://localhost:3000/TodoLists")
			} else {
				router.push("http://localhost:3000/api/auth/signin")
			}
		}
	}

	const onRegisterHandler = () => {
		router.push("http://localhost:3000/register")
	}

	return (
		<div>
			<Head>
				<title>Sign in</title>
				<meta name="description" content="Todo list App" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="w-[100%] m-auto text-center mt-28">
				<h2 className="m-auto text-primary font-medium text-[2em]">
					Todo App
				</h2>
			</div>
			<div className="w-1/3 m-auto mt-4 px-10 py-12 rounded-md text-gray-300 bg-primary flex flex-col justify-items-center align-middle ">
				<p className="w-1/4 p-1 text-center m-auto text-white font-semibold text-lg">
					Sign in
				</p>
				<div className="flex flex-col w-3/4 m-auto">
					<label className="px-2 mb-1 mt-4">Email</label>
					<input
						ref={emailRef}
						name="email"
						type="email"
						placeholder={"Enter email"}
						className="bg-item rounded-md px-4 py-1 outline-none text-md text-gray-400"
					/>
				</div>
				<div className="flex flex-col w-3/4 m-auto">
					<label className="px-2 mb-1 mt-4">Password</label>
					<input
						ref={passwordRef}
						name="password"
						type="password"
						placeholder={"Password"}
						className="bg-item rounded-md px-4 py-1 outline-none text-md text-gray-400"
					/>
				</div>
				<button
					onClick={onClickHandle}
					className="mt-10 w-2/4 m-auto rounded-full bg-blue-600 text-white py-1 text-md hover:bg-blue-700"
				>
					Login
				</button>
				<p
					className="mt-10 text-sm m-auto cursor-pointer hover:underline"
					onClick={onRegisterHandler}
				>
					Don&#39;t have an Account! Register
				</p>
			</div>
		</div>
	)
}

export default Index
