'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const NotificationBar = () => {
	const [type, setType] = useState<string>('')

	useEffect(() => {
		setType(localStorage.getItem('notification') || '')
	}, [])

	if (type == '') {
		return
	}

	const NotificationElement = () => {
		switch (type) {
			case 'login':
				return (
					<div className='flex'>
						You are already registered. Now you can
						<Link href='auth' className='ml-1 font-bold'>
							login
						</Link>
					</div>
				)
		}
	}

	return (
		<div className='flex text-center items-center justify-center bottom-0 fixed w-full bg-bg text-second h-8'>
			<NotificationElement />
		</div>
	)
}

export default NotificationBar
