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
				return 'text-3xl placeholder:text-3xl !min-h-[42px]'
			case 'h2':
				return 'text-2xl placeholder:text-2xl min-h-10'
			case 'h3':
				return 'text-xl placeholder:text-xl min-h-8'
			case 'h4':
				return 'text-lg placeholder:text-lg min-h-6'
			case 'h5':
				return 'text-base placeholder:text-base min-h-4'
			default:
				return 'text-base placeholder:text-base' // стандартный стиль для текстового поля
		}
	}

	const handleSelect = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
		const target = event.target as HTMLTextAreaElement
		const selectedText = target.value.substring(
			target.selectionStart,
			target.selectionEnd
		)
		if (selectedText.length) {
		}
	}

	return (
		<div className='flex justify-center py-4 pl-48 items-start w-full h-screen z-2'>
			<div className='flex flex-col w-[1000px] gap-1 px-12 justify-start items-start'>
				<div
					className='outline-0 no-outline focus:outline-0 w-full text-[80px] bg-transparent resize-none overflow-hidden text-center'
					contentEditable
					onInput={e =>
						changeHeading(e.currentTarget.textContent || 'New Space')
					}
					suppressContentEditableWarning={true}
				></div>

				{elements.map(elem => (
					<div key={elem.id} className='flex w-full max-w-full'>
						<div
							contentEditable={true}
							suppressContentEditableWarning={false}
							style={{ direction: 'ltr' }}
							className={`no-outline editable px-2 py-1 hover:bg-bg focus:bg-bg pt-1 pl-1 rounded-md flex items-center w-full bg-transparent text-start resize-none ${getStyles(
								elem.type
							)}`}
							onInput={e =>
								handleTextChange(
									elem.id,
									e.currentTarget.textContent || 'New Text'
								)
							}
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
