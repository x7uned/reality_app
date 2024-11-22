'use client'

import { Events } from '@/app/(workplace)/dashboard/page'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import EventBlock from './blocks/event.calendar'

interface EventsCalendarProps {
	events: Events | undefined
}

const EventsCalendar = ({ events }: EventsCalendarProps) => {
	const [todayMenu, setTodayMenu] = useState(false)
	const [tomorrowMenu, setTomorrowMenu] = useState(false)
	const [nextWeekMenu, setNextWeekMenu] = useState(false)
	const [category, setCategory] = useState<string>()

	if (!events) {
		return
	}

	return (
		<>
			<div
				onClick={() => setTodayMenu(prev => !prev)}
				className={`flex items-center cursor-pointer`}
			>
				<MdKeyboardArrowRight
					className={`${
						todayMenu ? 'rotate-90' : ''
					} transition-all duration-200`}
					size='20px'
				/>
				<p className='select-none'>Today</p>
			</div>
			{todayMenu && (
				<motion.div
					initial={{ height: 0 }}
					animate={{ height: 'auto' }}
					exit={{ height: 0 }}
					transition={{ duration: 0.05, ease: 'easeInOut' }}
					className='flex flex-col gap-1 py-1 w-full settings-menu overflow-hidden'
				>
					{Array.isArray(events.today) &&
						events.today.map(e => <EventBlock event={e} key={e.id} />)}
				</motion.div>
			)}
			<div className='border-b border-border w-full'></div>
			<div
				onClick={() => setTomorrowMenu(prev => !prev)}
				className={`flex items-center cursor-pointer`}
			>
				<MdKeyboardArrowRight
					className={`${
						tomorrowMenu ? 'rotate-90' : ''
					} transition-all duration-200`}
					size='20px'
				/>
				<p className='select-none'>Tomorrow</p>
			</div>
			{tomorrowMenu && (
				<motion.div
					initial={{ height: 0 }}
					animate={{ height: 'auto' }}
					exit={{ height: 0 }}
					transition={{ duration: 0.05, ease: 'easeInOut' }}
					className='list-disc flex-col gap-1 py-1 w-full settings-menu overflow-hidden'
				>
					{Array.isArray(events.tomorrow) &&
						events.tomorrow.map(e => <EventBlock event={e} key={e.id} />)}
				</motion.div>
			)}
			<div className='border-b border-border w-full'></div>
			<div
				onClick={() => setNextWeekMenu(prev => !prev)}
				className={`flex items-center cursor-pointer`}
			>
				<MdKeyboardArrowRight
					className={`${
						nextWeekMenu ? 'rotate-90' : ''
					} transition-all duration-200`}
					size='20px'
				/>
				<p className='select-none'>Next week</p>
			</div>
			{nextWeekMenu && (
				<motion.div
					initial={{ height: 0 }}
					animate={{ height: 'auto' }}
					exit={{ height: 0 }}
					transition={{ duration: 0.05, ease: 'easeInOut' }}
					className='flex flex-col gap-1 py-1 w-full settings-menu overflow-hidden'
				>
					{Array.isArray(events.week) &&
						events.week.map(e => <EventBlock event={e} key={e.id} />)}
				</motion.div>
			)}
		</>
	)
}

export default EventsCalendar
