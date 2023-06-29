import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="icon" href="/favicon.svg" sizes="any" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin={"true" as any}
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Caveat&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body className="bg-[#9DB2BF]">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
