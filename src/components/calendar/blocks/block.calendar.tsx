import { CalendarBlockStyle, CalendarEvent } from '@/types/calendar'

const getBlockStyle = (style: CalendarBlockStyle) => {
	switch (style) {
		case 'purple':
			return 'bg-[#e1d8ff] dark:bg-[#3c3553]'
		case 'red':
			return 'bg-[#ffd1d1] dark:bg-[#533535]'
		case 'ocean':
			return 'bg-[#d2e3ff] dark:bg-[#355153]'
		case 'green':
			return 'bg-[#dfffd0] dark:bg-[#3d5234]'
		default:
			return 'bg-[#dbdbdb] dark:bg-[#242424]'
	}
}

export const getTypeStyle = (style: CalendarBlockStyle) => {
	switch (style) {
		case 'purple':
			return 'bg-[#c3b0ff] dark:bg-[#8560ff]'
		case 'red':
			return 'bg-[#ffb0b0] dark:bg-[#913939]'
		case 'ocean':
			return 'bg-[#afd2ff] dark:bg-[#379291]'
		case 'green':
			return 'bg-[#caffaf] dark:bg-[#5c9137]'
		default:
			return 'bg-[#c3b0ff] dark:bg-[#404040]'
	}
}

export const BlockCalendar = ({
	id,
	content,
	subContent,
	type,
	category,
	date,
}: CalendarEvent) => {
	switch (type) {
		case 'event':
			return (
				<div
					key={id}
					className={`flex border dark:border-none border-border ${getBlockStyle(
						category?.style || 'default'
					)} flex-col text-sm w-full p-1 pt-0.5 min-h-12 rounded-md`}
				>
					<p className='flex w-full truncate justify-start'>{content}</p>
					<p className=' text-subtext w-full justify-start flex truncate overflow-hidden'>
						{subContent}
					</p>
					{category && (
						<div
							className={`flex ${getTypeStyle(
								category.style
							)} rounded w-full xl:justify-center truncate overflow-hidden sm:justify-start px-1 items-center`}
						>
							{category.name}
						</div>
					)}
				</div>
			)
	}
}
