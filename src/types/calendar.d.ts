import { User } from 'next-auth'

export type CalendarBlockStyle =
	| 'purple'
	| 'red'
	| 'ocean'
	| 'green'
	| 'default'
export type CalendarBlockType = 'event'

export interface CalendarDay {
	// BACK END
	day: number | null
	isCurrentMonth: boolean
	fullDate: string | null
	events?: CalendarEvent[]
}

export interface CalendarCategory {
	id: number
	name: string
	createdAt: date
	style: CalendarBlockStyle
	userId: number
	user?: User
	events?: CalendarEvent[]
}

export interface CalendarEvent {
	id: number
	content: string
	subContent: string
	type: CalendarBlockType
	categoryId?: number
	category?: CalendarCategory
	date: string
	userId: number
	user?: User
}
