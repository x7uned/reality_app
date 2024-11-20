export interface Space {
	id: number
	background: string
	name: string
	elements: Element[]
	icon: IconType
}

export type ElemType =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'list'
	| 'checks'
	| 'nums'
	| 'img'

export type IconType = 'default' | 'rocket' | 'body' | 'bolt' | 'heart'

export interface Element {
	id: number
	type: ElemType
	content: string
	completed?: boolean
	textAlign?: 'left' | 'center' | 'right'
	width?: number
	height?: number
}
