import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="icon" href="/favicon.svg" sizes="any" />
			</Head>
			<body className="bg-[#9DB2BF]">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
