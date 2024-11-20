'use client'

import EventsCalendar from '@/components/calendar/events.calendar'
import MonthCalendar from '@/components/calendar/month.calendar'
import { useSpaces } from '@/components/contexts/spaces.context'
import { fetchGetCalendar } from '@/lib/slices/calendar.slice'
import { useAppDispatch } from '@/lib/store'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { MdKeyboardArrowRight, MdOutlineHome } from 'react-icons/md'

const Dashboard = () => {
	const { fetchSpacesData } = useSpaces()
	const [calendar, setCalendar] = useState([])
	const [gap, setGap] = useState<number>(0)
	const { status } = useSession()
	const dispatch = useAppDispatch()

	const changeGap = (type: '+' | '-') => {
		if (type == '+') {
			setGap(prev => prev + 1)
		} else {
			setGap(prev => prev - 1)
		}
	}

	const fetchCalendar = async () => {
		try {
			if (status == 'authenticated') {
				console.log('fetch')
				const date = new Date()
				date.setMonth(date.getMonth() + gap)
				const data = `${date.getFullYear()}-${
					date.getMonth() + 1
				}-${date.getDate()}`

				const fetch = await dispatch(fetchGetCalendar(data))
				console.log(fetch)
				if (fetch.payload.success && fetch.payload.data) {
					setCalendar(fetch.payload.data)
				}
			}
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchCalendar()
	}, [gap])

	useEffect(() => {
		fetchSpacesData()
	}, [])

	return (
		<div className='flex py-3 pl-60 pr-12 w-full h-screen justify-center items-center'>
			<div className='flex flex-col px-1 gap-1 h-full w-full'>
				<div className='flex mt-3 items-center gap-1 text-subtext'>
					<MdOutlineHome size={'26px'} />
					<MdKeyboardArrowRight size={'18px'} />
					<p className='font-medium text-sm'>Dashboard</p>
				</div>
				<div className='flex gap-12 w-full h-2/3 mt-3'>
					<div className='flex flex-col justify-start items-start w-3/5 h-full'>
						<p
							onClick={() => console.log(calendar)}
							className='w-full text-3xl font-bold'
						>
							Calendar
						</p>
						{Array.isArray(calendar) && calendar.length !== 0 && (
							<div className='flex w-full h-full overflow-hidden'>
								<MonthCalendar
									changeGap={changeGap}
									gap={gap}
									calendarDays={calendar}
								/>
							</div>
						)}
					</div>
					<div className='flex flex-col justify-start items-start w-2/5 h-full gap-1'>
						<p className='w-full text-2xl font-bold'>Events</p>
						<div className='border-b border-border w-full'></div>
						<EventsCalendar />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
