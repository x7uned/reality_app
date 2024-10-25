'use client'

import { Element } from '@/app/space/[id]/page'
import { Dispatch, SetStateAction, useState } from 'react'

interface SpaceElementsProps {
	space: { name: string } | undefined
	elements: Element[]
	setElements: Dispatch<SetStateAction<Element[]>>
	setSpace: Dispatch<
		SetStateAction<{ id: number; background: string; name: string } | undefined>
	>
}

const SpaceElements = ({
	space,
	setSpace,
	elements,
	setElements,
}: SpaceElementsProps) => {
	const [showMenu, setShowMenu] = useState(false)
	const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })

	const handleTextChange = (id: number, content: string) => {
		setElements(prev =>
			prev.map(element =>
				element.id === id ? { ...element, content } : element
			)
		)
	}

	const handleTextSelection = (event: React.MouseEvent) => {
		const selection = window.getSelection()
		if (selection && selection.toString()) {
			const { clientX: x, clientY: y } = event
			setMenuPosition({ x, y })
			setShowMenu(true)
		} else {
			setShowMenu(false)
		}
	}

	const applyStyle = (style: 'bold' | 'italic') => {
		document.execCommand(style)
	}

	return (
		<div className='flex justify-center py-4 items-start w-screen h-screen z-2'>
			<div className='flex flex-col w-[1000px] px-12 justify-start items-start'>
				<div
					contentEditable
					style={{ direction: 'ltr', textAlign: 'center' }}
					className='outline-0 w-full text-[80px] bg-transparent resize-none overflow-hidden'
					onInput={e =>
						setSpace(prev =>
							prev
								? { ...prev, name: (e.target as HTMLDivElement).innerText }
								: {
										id: Date.now(),
										background: '',
										name: (e.target as HTMLDivElement).innerText,
								  }
						)
					}
					onClick={handleTextSelection}
					suppressContentEditableWarning={true}
				>
					{!space?.name && <span style={{ opacity: 0.5 }}>New Space</span>}
					{space?.name}
				</div>
				{elements.map(elem => (
					<div
						key={elem.id}
						className='flex w-full'
						onClick={handleTextSelection}
					>
						<div
							spellCheck={true}
							contentEditable={true}
							suppressContentEditableWarning={true}
							style={{ direction: 'ltr', textAlign: 'start' }}
							className='outline-0 w-full bg-transparent text-start resize-none overflow-hidden my-2'
							onInput={e =>
								handleTextChange(
									elem.id,
									(e.target as HTMLDivElement).innerText
								)
							}
						>
							{!elem.content && (
								<span
									style={{ opacity: 0.5 }}
								>{`Start typing ${elem.type}`}</span>
							)}
							{elem.content}
						</div>
					</div>
				))}
				{window.getSelection()?.type == 'Range' && (
					<div
						className={`absolute transition-all duration-300 ${
							showMenu ? '' : 'opacity-0 pointer-events-none'
						} bg-bg border rounded flex`}
						style={{ top: menuPosition.y - 65, left: menuPosition.x }}
					>
						<button
							onClick={() => applyStyle('bold')}
							className='font-bold px-2'
						>
							B
						</button>
						<button
							onClick={() => applyStyle('italic')}
							className='italic px-2'
						>
							I
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default SpaceElements
