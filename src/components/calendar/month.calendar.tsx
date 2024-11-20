'use client'

import { CalendarDay } from '@/types/calendar'
import {
	MdKeyboardArrowRight,
	MdOutlineKeyboardArrowLeft,
} from 'react-icons/md'
import { BlockCalendar } from './blocks/block.calendar'

interface MonthCalendarProps {
	calendarDays: CalendarDay[]
	gap: number
	changeGap: (type: '+' | '-') => void
}

const MonthCalendar = ({
	calendarDays,
	gap,
	changeGap,
}: MonthCalendarProps) => {
	const isToday = (dateString: string) => {
		const inputDate = new Date(dateString)
		const today = new Date()

		return (
			inputDate.getFullYear() === today.getFullYear() &&
			inputDate.getMonth() === today.getMonth() &&
			inputDate.getDate() === today.getDate()
		)
	}

	const getAdjustedDate = (gap: number) => {
		const today = new Date()
		today.setMonth(today.getMonth() + gap)
		return today
	}

	const adjustedDate = getAdjustedDate(gap)
	const month = adjustedDate.toLocaleString('en-US', { month: 'long' })
	const year = adjustedDate.getFullYear()

	return (
		<div className='flex flex-col w-full h-full'>
			<div className='flex my-2 h-10 w-full justify-between items-center'>
				<div className='flex items-center gap-3 text-subtext'>
					<MdOutlineKeyboardArrowLeft
						onClick={() => changeGap('-')}
						className='cursor-pointer'
						size={'20px'}
					/>
					<p className='text-xl w-48 text-center select-none font-medium'>
						{month} {year}
					</p>
					<MdKeyboardArrowRight
						onClick={() => changeGap('+')}
						className='cursor-pointer'
						size={'20px'}
					/>
				</div>
			</div>
			<div className='flex w-full pb-1'>
				{Array('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun').map(day => (
					<div className='flex text-sm w-full justify-center text-subtext'>
						{day}
					</div>
				))}
			</div>
			<div className='grid grid-cols-7 border-border dark:border w-full h-full'>
				{Array.isArray(calendarDays) &&
					calendarDays.map((day, index) => (
						<div
							key={index}
							className={`bg-bg overflow-y-auto no-scrollbar px-1 flex flex-col items-center justify-start ${
								day.isCurrentMonth ? '' : 'opacity-50'
							}`}
							title={day.fullDate || ''}
						>
							<div className={`flex text-xs w-full justify-end`}>
								<p
									className={`rounded-full flex items-center justify-center w-5 h-5 p-px ${
										isToday(day.fullDate || '') ? 'bg-second text-white' : ''
									}`}
								>
									{day.day}
								</p>
							</div>
							<div className='flex gap-0.5 h-full flex-col no-scrollbar overflow-y-auto w-full'>
								{day.events &&
									day.events.map(e => (
										<BlockCalendar
											id={e.id}
											content={e.content}
											subContent={e.subContent}
											type={e.type}
											category={e.category}
											date={e.date}
											userId={e.userId}
										/>
									))}
							</div>
						</div>
					))}
			</div>
		</div>
	)
}

export default MonthCalendar
