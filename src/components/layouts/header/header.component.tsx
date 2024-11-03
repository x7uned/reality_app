'use client'

import ThemeChangeComponent from '@/components/theme.component'
import { usePathname, useRouter } from 'next/navigation'
import {
	MdEventNote,
	MdOutlineEditCalendar,
	MdOutlineKeyboardArrowRight,
	MdOutlineNote,
	MdOutlineSettings,
	MdSpaceDashboard,
} from 'react-icons/md'
import ProfileComponent from './profile.component'

const Header = () => {
	const page = usePathname()
	const router = useRouter()

	return (
		<div className='flex z-10 dark:border-r flex-col justify-between w-48 bg-bg fixed h-screen py-2 border-border'>
			<div className='flex w-full flex-col gap-1 items-center'>
				<div
					onClick={() => router.push('/')}
					className={`flex transition-all duration-300 items-center cursor-pointer hover:bg-selection rounded-[4px] px-2 h-8 w-5/6 ${
						page == '/' ? 'bg-selection' : ''
					}`}
				>
					<MdSpaceDashboard
						size={'20px'}
						className={`w-1/6 transition-all duration-300 ${
							page == '/' ? 'text-second' : ''
						}`}
					/>
					<p className='ml-2 w-5/6'>Dashboard</p>
				</div>
				<div
					className={`flex items-center cursor-pointer transition-all duration-300 hover:bg-selection rounded-[4px] px-2 h-8 w-5/6 ${
						page == '/calendar' ? 'bg-selection' : ''
					}`}
				>
					<MdOutlineEditCalendar
						size={'20px'}
						className={`w-1/6 transition-all duration-300 ${
							page == '/calendar' ? 'text-second' : ''
						}`}
					/>
					<p className='ml-2 w-5/6'>Calendar</p>
				</div>
				<div
					className={`flex items-center cursor-pointer transition-all duration-300 hover:bg-selection rounded-[4px] px-2 h-8 w-5/6 ${
						page == '/settings' ? 'bg-selection' : ''
					}`}
				>
					<MdOutlineSettings
						size={'20px'}
						className={`w-1/6 transition-all duration-300 ${
							page == '/settings' ? 'text-second' : ''
						}`}
					/>
					<p className='ml-2 w-5/6'>Settings</p>
				</div>
				<div className='relative flex justify-center w-2/3'>
					<div className='absolute inset-0 flex items-center'>
						<div className='w-full border-t border-border'></div>
					</div>
					<span className='bg-bg relative px-1 text-subtext'>
						<MdEventNote />
					</span>
				</div>
				<div
					onClick={() => router.push('/space/1')}
					className={`flex items-center cursor-pointer transition-all duration-300 hover:bg-selection rounded-[4px] px-2 h-8 w-5/6 ${
						page.includes('space/1') ? 'bg-selection' : ''
					}`}
				>
					<MdOutlineNote
						size={'20px'}
						className={`w-1/6 transition-all duration-300 ${
							page.includes('space/1') ? 'text-second' : ''
						}`}
					/>
					<p className='ml-2 w-5/6'>New Space</p>
					<MdOutlineKeyboardArrowRight
						className={page.includes('space/1') ? '' : 'hidden'}
					/>
				</div>
			</div>
			<div className='flex flex-col items-center'>
				<ThemeChangeComponent />
				<ProfileComponent />
			</div>
		</div>
	)
}

export default Header
