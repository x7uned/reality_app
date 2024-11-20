import Header from '@/components/layouts/header/header.component'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Reality Work',
	description: 'Reality APP. Powered by x7uned',
}
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Header />
			{children}
		</>
	)
}
