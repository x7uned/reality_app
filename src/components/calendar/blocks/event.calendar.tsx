import { CalendarEvent } from '@/types/calendar'
import { getTypeStyle } from './block.calendar'

interface EventBlockProps {
	event: CalendarEvent
	key: number
}

const EventBlock = ({ event, key }: EventBlockProps) => {
	const date = new Date(event.date)

	const day = date.getDate()
	const month = date.toLocaleString('en-US', { month: 'long' })
	const year = date.getFullYear()

	return (
		<div key={key} className='flex justify-between w-full gap-2'>
			<p className='w-2/5'>{event.content}</p>
			{event.category && (
				<div
					className={`flex w-1/5 justify-center rounded-md items-center px-2 ${getTypeStyle(
						event.category.style
					)}`}
				>
					{event.category.name}
				</div>
			)}
			<p className='text-subtext w-2/5 text-end'>{`${month} ${day}, ${year}`}</p>
		</div>
	)
}

export default EventBlock
