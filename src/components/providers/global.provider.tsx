'use client'

import store from '@/lib/store'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { SpaceProvider } from '../contexts/data.context'

const GlobalProvider = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<ThemeProvider attribute='class'>
			<SessionProvider>
				<Provider store={store}>
					<SpaceProvider>{children}</SpaceProvider>
				</Provider>
			</SessionProvider>
		</ThemeProvider>
	)
}

export default GlobalProvider
