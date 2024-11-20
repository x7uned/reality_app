'use client'

import Image from 'next/image'
import Link from 'next/link'

const Home = () => {
	return (
		<div className='flex flex-col w-full justify-center h-screen items-start'>
			<div className='flex z-0 absolute justify-center overflow-hidden w-full h-full'>
				<div className='background-effect'></div>
				<div className='background-effect-2'></div>
			</div>
			<div className='flex px-72 w-full justify-around items-center z-10 gap-1 py-6'>
				<div className='w-2/6 gap-1  flex items-center justify-around'>
					<Link href='/dashboard'>
						<p className='text-lg cursor-pointer'>Dashboard</p>
					</Link>
					<Link href='/calendar'>
						<p className='text-lg cursor-pointer'>Calendar</p>
					</Link>
					<Link href='/overview'>
						<p className='text-lg cursor-pointer'>Overview</p>
					</Link>
				</div>
				<div className='w-2/6 flex justify-center'>
					<Image src='/icon.png' width={60} height={60} alt='Icon' />
				</div>
				<div className='w-2/6 gap-4  flex items-center justify-center'>
					<Link href='/auth'>Sign in</Link>
					<Link href='/auth'>
						<button className='bg-bg px-2 py-1 rounded-xl'>Sign up</button>
					</Link>
				</div>
			</div>
			<div className='flex z-10 flex-col items-center mt-24 w-full h-full'>
				<p className='text-7xl'>
					Make your <span className='underline font-bold'>reality</span>
				</p>
				<p className='text-2xl mt-4 w-1/6 dark:text-subtext text-center'>
					A platform that allows you to control your life routine and future
					goals
				</p>
				<div className='flex mt-4 items-center w-1/5 gap-2 justify-center'>
					<Link href='/dashboard'>
						<button className='bg-bg px-4 py-2 rounded-xl text-2xl'>
							START NOW
						</button>
					</Link>
					<Link href='/faq'>
						<button className='px-4 py-2 rounded-xl text-2xl'>FAQ</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Home
