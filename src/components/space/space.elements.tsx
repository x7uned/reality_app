'use client'

import { Element, Space } from '@/app/space/[id]/page'
import { Dispatch, SetStateAction } from 'react'

interface SpaceElementsProps {
	space: Space | undefined
	elements: Element[]
	setElements: Dispatch<SetStateAction<Element[]>>
	changeHeading: (text: string) => void
}

const SpaceElements = ({
	space,
	changeHeading,
	elements,
	setElements,
}: SpaceElementsProps) => {
	const handleTextChange = (id: number, content: string) => {
		setElements(prev => {
			if (!prev) return prev // Возвращаем предыдущее значение, если оно undefined
			return prev.map(element =>
				element.id === id ? { ...element, content } : element
			)
		})
	}

	const getStyles = (type: string) => {
		switch (type) {
			case 'h1':
				return 'text-3xl'
			case 'h2':
				return 'text-2xl'
			case 'h3':
				return 'text-xl'
			case 'h4':
				return 'text-lg'
			case 'h5':
				return 'text-base'
			default:
				return 'text-base' // стандартный стиль для текстового поля
		}
	}

	// const handleSelect = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
	// 	const target = event.target as HTMLTextAreaElement
	// 	const selectedText = target.value.substring(
	// 		target.selectionStart,
	// 		target.selectionEnd
	// 	)
	// 	if (selectedText.length) {
	// 	}
	// }

	const handleCheckIsEmpty = (e: React.SyntheticEvent<HTMLDivElement>) => {
		const target = e.currentTarget as HTMLDivElement
		if (target.innerHTML === '<br>') {
			target.innerHTML = ''
		}
	}

	return (
		<div className='flex justify-center py-4 pl-48 items-start w-full h-screen z-2'>
			<div className='flex flex-col w-[1000px] gap-1 px-12 justify-start items-start'>
				<div
					role='textbox'
					aria-multiline='true'
					className='no-outline content editable placeholder w-full text-[50px] bg-transparent resize-none text-center'
					contentEditable
					onInput={e => {
						changeHeading(e.currentTarget.textContent || 'New Space')
						handleCheckIsEmpty(e)
					}}
					suppressContentEditableWarning={true}
				></div>

				{elements.map(elem => (
					<div key={elem.id} className='flex w-full max-w-full'>
						<div
							role='textbox'
							aria-multiline='true'
							contentEditable={true}
							suppressContentEditableWarning={true}
							className={`no-outline focus:shadow dark:shadow-none bg-bg editable placeholder dark:focus:bg-bg px-2 py-1 pt-1 pl-1 rounded-md w-full text-start resize-none ${getStyles(
								elem.type
							)}`}
							onInput={e => {
								handleTextChange(
									elem.id,
									e.currentTarget.textContent || 'New Text'
								)
								handleCheckIsEmpty(e)
							}}
						></div>
					</div>
				))}
			</div>
			<div className='flex absolute bottom-0 right-0'>
				<p onClick={() => console.log(space)}>CONSOLE</p>
			</div>
		</div>
	)
}

export default SpaceElements
