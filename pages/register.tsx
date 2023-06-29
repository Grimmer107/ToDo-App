import React, { useRef } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import toast, { Toaster } from "react-hot-toast"

const Register = () => {
	const router = useRouter()
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const onClickHandle = async () => {
		if (emailRef.current && passwordRef.current) {
			if (emailRef.current.value === "") {
				toast(`Email not entered!`)
				return
			} else if (passwordRef.current.value === "") {
				toast(`Password not entered!`)
				return
			}
			const res = await fetch(
				"http://localhost:3000/api/user" as string,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: emailRef.current!.value,
						password: passwordRef.current!.value
					})
				}
			)
			if (res && res.ok) {
				router.push("http://localhost:3000/api/auth/signin")
			} else {
				toast(`User not registered. Internal Server Error!`)
			}
		}
	}

	const onLoginHandler = async () => {
		router.push("http://localhost:3000/api/auth/signin")
	}

	return (
		<div>
			<Head>
				<title>Register</title>
				<meta name="description" content="Todo list App" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<Toaster
				toastOptions={{
					className: "bg-primary text-white",
					duration: 3000,
					style: {
						border: "1px solid #272851",
						padding: "16px",
						color: "#272851",
						backgroundColor: "#f9e45b"
					}
				}}
			/>
			<div className="w-[80%] md:w-1/2 lg:w-1/3 m-auto text-center mt-24 font-caveat">
				<div className="border-2 m-auto py-[1em] rounded-md bg-primary text-white">
					<h2 className="m-auto font-medium text-[2em]">ToDo App</h2>
				</div>
			</div>
			<div className="w-[80%] md:w-1/2 lg:w-1/3 m-auto mt-2 px-10 py-12 rounded-md text-gray-300 bg-primary flex flex-col justify-items-center align-middle ">
				<p className="p-1 text-center m-auto text-white font-semibold text-lg">
					Sign up
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
					Register
				</button>
				<p
					onClick={onLoginHandler}
					className="mt-10 text-sm m-auto cursor-pointer hover:underline"
				>
					Already have an Account! Login
				</p>
			</div>
		</div>
	)
}

export default Register
