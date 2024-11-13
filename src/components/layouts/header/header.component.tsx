'use client'

import { useSpaces } from '@/components/contexts/spaces.context'
import IconsComponent from '@/components/space/icons.component'
import ThemeChangeComponent from '@/components/theme.component'
import { fetchCreateSpace } from '@/lib/slices/space.slice'
import { useAppDispatch } from '@/lib/store'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { LuFilePlus2 } from 'react-icons/lu'
import {
	MdEventNote,
	MdOutlineEditCalendar,
	MdOutlineSettings,
	MdSpaceDashboard,
} from 'react-icons/md'
import ProfileComponent from './profile.component'

const Header = () => {
	const page = usePathname()
	const router = useRouter()
	const dispatch = useAppDispatch()
	const { spaces, fetchSpacesData } = useSpaces()
	const { data: session, status } = useSession()

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
		<div className='flex z-10 dark:border-r flex-col justify-center gap-6 w-48 bg-bg fixed h-screen py-2 border-border'>
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
				<div className='relative flex justify-center w-2/3'>
					<div className='absolute inset-0 flex items-center'>
						<div className='w-full border-t border-border'></div>
					</div>
					<span className='bg-bg relative px-1 text-subtext'>
						<MdEventNote />
					</span>
				</div>
				{Array.isArray(spaces) &&
					status == 'authenticated' &&
					spaces.map(space => (
						<div
							key={space.id}
							onClick={() => router.push(`/space/${space.id}`)}
							className={getNavItemClass(`/space/${space.id}`)}
						>
							<div className='flex w-6'>
								<IconsComponent icon={space.icon} active={false} />
							</div>
							<p className='ml-2 truncate w-5/6'>{space.name}</p>
						</div>
					))}
				<div
					onClick={() => handleCreateNewSpace()}
					className={`${
						status == 'authenticated' ? 'flex' : 'hidden'
					} items-center cursor-pointer transition-all duration-300 hover:bg-selection rounded-[4px] px-2 h-8 w-5/6`}
				>
					<div className='flex w-6'>
						<LuFilePlus2
							size={'20px'}
							className={'transition-all duration-300'}
						/>
					</div>
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
