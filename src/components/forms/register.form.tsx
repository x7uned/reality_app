'use client'

import { fetchSignUp } from '@/lib/slices/auth.slice'
import { useAppDispatch } from '@/lib/store'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import * as yup from 'yup'

const schema = yup.object().shape({
	username: yup.string().min(3, 'Min 3 symbols').required('Name is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup
		.string()
		.min(6, 'Min 6 symbols')
		.required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords must match')
		.required('Confirm Password is required'),
})

export interface SignUpInterface {
	username: string
	email: string
	password: string
	confirmPassword: string
}

const RegisterForm = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [success, setSuccess] = useState(false)
	const dispatch = useAppDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	const onSubmit = async (data: SignUpInterface) => {
		try {
			const params = {
				username: data.username,
				email: data.email,
				password: data.password,
			}

			const fetch = await dispatch(fetchSignUp(params))

			if (fetch.payload.success) {
				setSuccess(true)
			}
		} catch (error) {
			console.error('Sign up failed:', error)
		}
	}

	return (
		<div className='flex w-full'>
			<form onSubmit={handleSubmit(onSubmit)} className='w-full'>
				<div className='mb-4'>
					<label
						htmlFor='username'
						className='block text-gray-700 dark:text-gray-300'
					>
						Username:
					</label>
					<input
						id='username'
						{...register('username')}
						className='w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400'
					/>
					{errors.username && (
						<span className='text-red-400 font-bold text-sm'>
							{errors.username.message}
						</span>
					)}
				</div>

				<div className='mb-4'>
					<label
						htmlFor='email'
						className='block text-gray-700 dark:text-gray-300'
					>
						Email:
					</label>
					<input
						id='email'
						{...register('email')}
						className='w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400'
					/>
					{errors.email && (
						<span className='text-red-400 font-bold text-sm'>
							{errors.email.message}
						</span>
					)}
				</div>

				<div className='relative mb-4'>
					<label
						htmlFor='password'
						className='block text-gray-700 dark:text-gray-300'
					>
						Password:
					</label>
					<input
						id='password'
						type={showPassword ? 'password' : 'text'}
						{...register('password')}
						className='w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400'
					/>
					<button
						type='button'
						onClick={() => setShowPassword(!showPassword)}
						className='absolute right-2 top-9 text-gray-700 dark:text-gray-300'
					>
						{showPassword ? <FaEyeSlash /> : <FaEye />}
					</button>
					{errors.password && (
						<span className='text-red-400 font-bold text-sm'>
							{errors.password.message}
						</span>
					)}
				</div>

				<div className='relative mb-4'>
					<label
						htmlFor='confirmPassword'
						className='block text-gray-700 dark:text-gray-300'
					>
						Confirm Password:
					</label>
					<input
						id='confirmPassword'
						type={showConfirmPassword ? 'password' : 'text'}
						{...register('confirmPassword')}
						className='w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400'
					/>
					<button
						type='button'
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
						className='absolute right-2 top-9 text-gray-700 dark:text-gray-300'
					>
						{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
					</button>
					{errors.confirmPassword && (
						<span className='text-red-400 font-bold text-sm'>
							{errors.confirmPassword.message}
						</span>
					)}
				</div>

				<div className='flex w-full justify-between items-center mt-2'>
					<p className='text-gray-400 dark:text-gray-500'>
						Already have an account?
					</p>
					<Link href='/signin'>
						<p className='ml-1 text-blue-600 dark:text-blue-400'>Sign in</p>
					</Link>
				</div>

				<button
					className='bg-[var(--third)] w-full py-2 rounded-md mt-2 text-gray-700 dark:text-gray-200'
					type='submit'
				>
					Sign up
				</button>
			</form>
			<p hidden={!success} className='text-green-400'>
				Successfully :)
			</p>
		</div>
	)
}

export default RegisterForm
