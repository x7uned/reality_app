import { fetchDeleteEvent } from '@/lib/slices/calendar.slice'
import { useAppDispatch } from '@/lib/store'
import { CalendarEvent } from '@/types/calendar'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { IoMdSettings } from 'react-icons/io'
import { RiDeleteBin7Line } from 'react-icons/ri'
import { getTypeStyle } from './block.calendar'

interface EventBlockProps {
	event: CalendarEvent
	key: number
	refreshData: () => void
}

const EventBlock = ({ event, key, refreshData }: EventBlockProps) => {
	const date = new Date(event.date)
	const dispatch = useAppDispatch()
	const [updateModal, setUpdateModal] = useState<boolean>(false)

	const handleDeleteEvent = async () => {
		try {
			const fetch = await dispatch(fetchDeleteEvent(event.id))
			if (fetch.payload.success) {
				refreshData()
			}
		} catch (error) {
			console.error(error)
		}
	}

	const Modal = dynamic(() => import('@/components/modal'), {
		ssr: false,
	})

	const day = date.getDate()
	const month = date.toLocaleString('en-US', { month: 'long' })
	const year = date.getFullYear()

	return (
		<>
			<div key={key} className='flex justify-between items-center w-full gap-2'>
				<div className='w-3/6 gap-2 flex items-center'>
					<p>{event.content}</p>
					<div className='flex gap-1'>
						<div
							onClick={() => handleDeleteEvent()}
							className='flex hover:bg-bg2 hover:shadow duration-150 cursor-pointer h-7 w-7 rounded-md transition-allflex justify-center items-center'
						>
							<RiDeleteBin7Line className='text-red-400' size='18' />
						</div>
						<div
							onClick={() => setUpdateModal(true)}
							className='flex hover:bg-bg2 hover:shadow duration-150 cursor-pointer h-7 w-7 rounded-md transition-allflex justify-center items-center'
						>
							<IoMdSettings className='text-blue-400' size='18' />
						</div>
					</div>
				</div>
				{event.category && (
					<div
						className={`flex w-1/6 justify-center rounded-md items-center px-2 ${getTypeStyle(
							event.category.style
						)}`}
					>
						{event.category.name}
					</div>
				)}
				<p className='text-subtext w-2/6 text-end'>{`${month} ${day}, ${year}`}</p>
			</div>
			<Modal isOpen={updateModal} onClose={setUpdateModal}>
				<div className='flex'>
					<p>hello</p>
				</div>
			</Modal>
		</>
	)
}

export default EventBlock
