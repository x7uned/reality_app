'use client'

import ThemeChangeComponent from '@/components/theme.component'
import { fetchCreateSpace, fetchGetSpaces } from '@/lib/slices/space.slice'
import { useAppDispatch } from '@/lib/store'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LuFile, LuFilePlus2 } from 'react-icons/lu'
import {
	MdEventNote,
	MdOutlineEditCalendar,
	MdOutlineKeyboardArrowRight,
	MdOutlineSettings,
	MdSpaceDashboard,
} from 'react-icons/md'
import ProfileComponent from './profile.component'

export interface SpaceMini {
	id: number
	name: string
}

const Header = () => {
	const page = usePathname()
	const router = useRouter()
	const dispatch = useAppDispatch()
	const [spaces, setSpaces] = useState<SpaceMini[]>([])

	const fetchSpacesData = async () => {
		try {
			const fetch = await dispatch(fetchGetSpaces())
			if (fetch.payload.spaces) {
				setSpaces(fetch.payload.spaces || [])
			}
		} catch (error) {
			console.error('Error fetching spaces:', error)
		}
	}

	useEffect(() => {
		fetchSpacesData()
	}, [dispatch])

	const handleCreateNewSpace = async () => {
		try {
			const fetch = await dispatch(fetchCreateSpace())
			if (fetch.payload.success) {
				router.push(`/space/${fetch.payload.space.id}`)
				fetchSpacesData()
			}
		} catch (error) {
			console.error('Error fetching spaces:', error)
		}
	}

	const getNavItemClass = (path: string) =>
		`flex items-center cursor-pointer transition-all duration-300 hover:bg-selection rounded-[4px] px-2 h-8 w-5/6 ${
			page === path ? 'bg-selection' : ''
		}`

	const getIconClass = (path: string) =>
		`w-1/6 transition-all duration-300 ${page === path ? 'text-second' : ''}`

	return (
		<div className='flex z-10 dark:border-r flex-col justify-between w-48 bg-bg fixed h-screen py-2 border-border'>
			<div className='flex w-full flex-col gap-1 items-center'>
				<div onClick={() => router.push('/')} className={getNavItemClass('/')}>
					<MdSpaceDashboard size={'20px'} className={getIconClass('/')} />
					<p className='ml-2 w-5/6'>Dashboard</p>
				</div>
				<div
					onClick={() => router.push('/calendar')}
					className={getNavItemClass('/calendar')}
				>
					<MdOutlineEditCalendar
						size={'20px'}
						className={getIconClass('/calendar')}
					/>
					<p className='ml-2 w-5/6'>Calendar</p>
				</div>
				<div
					onClick={() => router.push('/settings')}
					className={getNavItemClass('/settings')}
				>
					<MdOutlineSettings
						size={'20px'}
						className={getIconClass('/settings')}
					/>
					<p className='ml-2 w-5/6'>Settings</p>
				</div>
				<div
					onClick={() => console.log(spaces)}
					className='relative flex justify-center w-2/3'
				>
					<div className='absolute inset-0 flex items-center'>
						<div className='w-full border-t border-border'></div>
					</div>
					<span className='bg-bg relative px-1 text-subtext'>
						<MdEventNote />
					</span>
				</div>
				{spaces.map(space => (
					<div
						key={space.id}
						onClick={() => router.push(`/space/${space.id}`)}
						className={getNavItemClass(`/space/${space.id}`)}
					>
						<LuFile
							size={'20px'}
							className={getIconClass(`/space/${space.id}`)}
						/>
						<p className='ml-2 truncate w-5/6'>{space.name}</p>
						{page.includes(`/space/${space.id}`) && (
							<MdOutlineKeyboardArrowRight />
						)}
					</div>
				))}
				<div
					onClick={() => handleCreateNewSpace()}
					className={
						'flex items-center cursor-pointer transition-all duration-300 hover:bg-selection rounded-[4px] px-2 h-8 w-5/6'
					}
				>
					<LuFilePlus2
						size={'20px'}
						className={'w-1/6 transition-all duration-300'}
					/>
					<p className='ml-2 truncate w-5/6'>Create Space</p>
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
