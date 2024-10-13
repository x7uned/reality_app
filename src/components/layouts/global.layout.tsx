import GlobalProvider from '../providers/global.provider'

export default function GlobalLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <GlobalProvider>{children}</GlobalProvider>
}
