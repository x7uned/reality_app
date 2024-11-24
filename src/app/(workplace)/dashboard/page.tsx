'use client'

import EventsCalendar from '@/components/calendar/events.calendar'
import MonthCalendar from '@/components/calendar/month.calendar'
import { useData } from '@/components/contexts/data.context'
import EventCreateForm from '@/components/forms/event.create.form'
import Modal from '@/components/modal'
import { fetchGetCalendar, fetchGetEvents } from '@/lib/slices/calendar.slice'
import { useAppDispatch } from '@/lib/store'
import { CalendarDay, CalendarEvent } from '@/types/calendar'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
	MdAddCircleOutline,
	MdKeyboardArrowRight,
	MdOutlineHome,
} from 'react-icons/md'

export interface Events {
	today: CalendarEvent[]
	tomorrow: CalendarEvent[]
	week: CalendarEvent[]
}

const Dashboard = () => {
	const { fetchSpacesData, fetchCategoriesData } = useData()
	const [calendar, setCalendar] = useState<CalendarDay[]>([])
	const [events, setEvents] = useState<Events>()
	const [createEventModal, setCreateEventModal] = useState<boolean>(false)
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

	const fetchEvents = async () => {
		try {
			if (status == 'authenticated') {
				console.log('fetch')
				const date = new Date()
				date.setMonth(date.getMonth() + gap)
				const data = `${date.getFullYear()}-${
					date.getMonth() + 1
				}-${date.getDate()}`

				const fetch = await dispatch(fetchGetEvents(data))
				if (fetch.payload.success) {
					setEvents(fetch.payload.events)
				}
			}
		} catch (error) {
			console.error(error)
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

	const refreshData = async () => {
		fetchSpacesData()
		fetchCategoriesData()
		fetchEvents()
		fetchCalendar()
	}

	useEffect(() => {
		refreshData()
	}, [])

	if (status == 'loading') {
		return (
			<div className='flex justify-center items-center h-screen w-full'>
				<p>Loading...</p>
			</div>
		)
	}

	return (
		<div className='flex py-3 pl-60 pr-12 w-full h-screen justify-center items-center'>
			<div className='flex flex-col px-1 gap-1 h-full w-full'>
				<div className='flex mt-3 items-center gap-1 text-subtext'>
					<Link href='/'>
						<MdOutlineHome size={'26px'} />
					</Link>
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
						<div className='flex items-center'>
							<p className='w-full text-2xl font-bold'>Events</p>
							<MdAddCircleOutline
								onClick={() => setCreateEventModal(true)}
								className='text-subtext cursor-pointer'
								size={30}
							/>
							<Modal isOpen={createEventModal} onClose={setCreateEventModal}>
								<EventCreateForm
									refreshData={refreshData}
									setCreateEventModal={setCreateEventModal}
								/>
							</Modal>
						</div>
						<div className='border-b border-border w-full'></div>
						<EventsCalendar refreshData={refreshData} events={events} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
