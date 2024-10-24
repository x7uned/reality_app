'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { MdLogin } from 'react-icons/md'

const ProfileComponent = () => {
	const { data: session, status } = useSession()

	if (status == 'authenticated') {
		return (
			<div className='flex gap-1 h-16 w-full items-center justify-center text-center'>
				<p>{session.user.username}</p>
			</div>
		)
	}

	return (
		<Link href='/auth'>
			<div className='flex gap-1 h-16 w-full items-center justify-center text-center'>
				<p className='text-xl font-semibold'>Sign in</p>
				<MdLogin size={'26px'} />
			</div>
		</Link>
	)
}

export default ProfileComponent
