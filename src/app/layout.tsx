import GlobalLayout from '@/components/layouts/global.layout'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
	title: 'Reality',
	description: 'Reality APP. Powered by x7uned',
}

const dmsans = DM_Sans({
	weight: ['400', '500', '700'], // или другие нужные веса
	subsets: ['latin'],
	display: 'swap', // для лучшей производительности
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${dmsans.className} antialiased`}>
				<GlobalLayout>{children}</GlobalLayout>
			</body>
		</html>
	)
}
