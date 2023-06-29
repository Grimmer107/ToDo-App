import "@/styles/index.css"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import { Suspense } from "react"
import { DefaultSeo } from "next-seo"
import ClipLoader from "react-spinners/ClipLoader"
import ErrorBoundary from "../components/ErrorBoundary"

export default function App({
	Component,
	pageProps
}: AppProps<{ session: Session }>) {
	return (
		<ErrorBoundary
			fallback={
				<div className="m-auto w-[100%] h-[100vh] text-center">
					Could not fetch data.
				</div>
			}
		>
			<DefaultSeo title="Todo App" description="A todo app in Next JS" />
			<Suspense
				fallback={
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
				}
			>
				<SessionProvider session={pageProps.session}>
					<Component {...pageProps} />
				</SessionProvider>
			</Suspense>
		</ErrorBoundary>
	)
}
