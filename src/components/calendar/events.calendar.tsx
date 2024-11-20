'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

const EventsCalendar = () => {
	const [todayMenu, setTodayMenu] = useState(false)
	const [tommorowMenu, setTommorowMenu] = useState(false)
	const [nextWeekMenu, setNextWeekMenu] = useState(false)

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
					transition={{ duration: 0.1, ease: 'easeInOut' }}
					className='flex flex-col gap-1 py-1 w-full settings-menu overflow-hidden'
				>
					<p>Hehe</p>
					<p>Additional content</p>
				</motion.div>
			)}
			<div className='border-b border-border w-full'></div>
			<div
				onClick={() => setTommorowMenu(prev => !prev)}
				className={`flex items-center cursor-pointer`}
			>
				<MdKeyboardArrowRight
					className={`${
						tommorowMenu ? 'rotate-90' : ''
					} transition-all duration-200`}
					size='20px'
				/>
				<p className='select-none'>Tommorow</p>
			</div>
			{tommorowMenu && (
				<motion.div
					initial={{ height: 0 }}
					animate={{ height: 'auto' }}
					exit={{ height: 0 }}
					transition={{ duration: 0.1, ease: 'easeInOut' }}
					className='flex flex-col gap-1 py-1 w-full settings-menu overflow-hidden'
				>
					<p>Hehe</p>
					<p>Additional content</p>
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
					transition={{ duration: 0.1, ease: 'easeInOut' }}
					className='flex flex-col gap-1 py-1 w-full settings-menu overflow-hidden'
				>
					<p>Hehe</p>
					<p>Additional content</p>
				</motion.div>
			)}
		</>
	)
}

export default EventsCalendar
