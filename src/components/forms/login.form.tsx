'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import * as yup from 'yup'

const schema = yup.object().shape({
	login: yup.string().min(3, 'Min 3 symbols').required('Login is required'),
	password: yup
		.string()
		.min(6, 'Min 6 symbols')
		.required('Password is required'),
})

export interface SignInInterface {
	login: string
	password: string
}

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState('')
	const router = useRouter()

	const onSubmit = async (data: SignInInterface) => {
		try {
			const { login, password } = data

			const result = await signIn('credentials', {
				redirect: false,
				login,
				password,
			})

			if (result?.error) {
				if (result?.error === 'Configuration') {
					setError('Login or password is invalid')
				} else {
					setError('Something went wrong')
				}
			}

			if (!result?.error) {
				localStorage.setItem('notification', '')
				router.push('/')
			}
		} catch (error) {
			console.error('Sign up failed:', error)
		}
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	return (
		<div className='flex w-full justify-center'>
			<form
				className='flex-col w-full max-w-md'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='relative mb-2'>
					<label
						htmlFor='login'
						className='block text-gray-700 dark:text-gray-300'
					>
						Login:
					</label>
					<input
						id='login'
						{...register('login')}
						className='w-full p-2 border rounded border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--second)]'
					/>
					{errors.login && (
						<span className='text-red-400 text-sm font-bold'>
							{errors.login.message}
						</span>
					)}
				</div>

				<div className='relative mb-2'>
					<label
						htmlFor='password'
						className='block text-gray-700 dark:text-gray-300'
					>
						Password:
					</label>
					<input
						id='password'
						type={showPassword ? 'text' : 'password'}
						{...register('password')}
						className='w-full p-2 border rounded border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--second)]'
					/>
					<button
						type='button'
						onClick={() => setShowPassword(!showPassword)}
						className='absolute right-2 top-9 text-[var(--subtext)]'
					>
						{showPassword ? <FaEye /> : <FaEyeSlash />}
					</button>
					{errors.password && (
						<span className='text-red-400 text-sm font-bold'>
							{errors.password.message}
						</span>
					)}
				</div>
				{error && <span className='text-red-400'>{error}</span>}

				<div className='flex w-full justify-between items-center mt-1'>
					<p className='text-[var(--subtext)]'>{"Don't have an account?"}</p>
					<Link href='/signup'>
						<p className='ml-2 text-[var(--second)]'>Sign up</p>
					</Link>
				</div>

				<button
					className='bg-[var(--second)] w-full py-2 rounded-md mt-2 text-white'
					type='submit'
				>
					Sign in
				</button>
			</form>
		</div>
	)
}

export default LoginForm
