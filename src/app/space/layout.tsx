import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Reality | Space',
	description: 'Reality Space. Powered by x7uned',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return children
}
