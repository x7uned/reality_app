import GlobalProvider from '../providers/global.provider'
import NotificationBar from './notifications/notification.bar'

export default function GlobalLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<GlobalProvider>
			{children}
			<NotificationBar />
		</GlobalProvider>
	)
}
