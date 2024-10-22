'use client'

import LoginForm from '@/components/forms/login.form'
import RegisterForm from '@/components/forms/register.form'
import ThemeChangeComponent from '@/components/theme.component'
import { signOut, useSession } from 'next-auth/react'

export default function Auth() {
	const { data: session, status } = useSession()

	const MiniProfile = () => {
		if (status == 'authenticated') {
			return (
				<div className='flex text-center flex-col'>
					<p>Username: {session.user.username}</p>
					<p>Avatar: {session.user.avatar}</p>
					<p>Email: {session.user.email}</p>
					<p>ID: {session.user.id}</p>
					<p>Role: {session.user.role}</p>
				</div>
			)
		} else {
			return <div className='loader'></div>
		}
	}

	return (
		<div className='flex w-full px-40 h-screen justify-center items-center'>
			<div className='flex w-1/3 justify-center'>
				<LoginForm />
			</div>
			<div className='flex flex-col gap-3 w-1/3 items-center'>
				<MiniProfile />
				<p
					className='cursor-pointer'
					onClick={() => {
						signOut()
					}}
				>
					Sign Out
				</p>
				<ThemeChangeComponent />
			</div>
			<div className='flex w-1/3 justify-center'>
				<RegisterForm />
			</div>
		</div>
	)
}
