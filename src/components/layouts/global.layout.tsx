import GlobalProvider from '../providers/global.provider'
import Header from './header/header.component'
import NotificationBar from './notifications/notification.bar'

export default function GlobalLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<GlobalProvider>
			<Header />
			<main className='pl-64'>{children}</main>
			<NotificationBar />
		</GlobalProvider>
	)
}
