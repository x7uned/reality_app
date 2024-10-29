// src/components/space/SpaceElements.tsx

/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Element, Space } from '@/app/space/[id]/page'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa6'
import SpaceElement from './space.element'

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
	const [isMenuVisible, setMenuVisible] = useState(false)
	const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
	const editableRefs = useRef<(HTMLDivElement | null)[]>([])

	const [isBold, setIsBold] = useState(false)
	const [isItalic, setIsItalic] = useState(false)
	const [isUnderline, setIsUnderline] = useState(false)
	const [selectedColor, setSelectedColor] = useState('#000000') // Default color

	const checkStyleState = () => {
		const selection = window.getSelection()
		if (selection && selection.rangeCount > 0) {
			setIsBold(document.queryCommandState('bold'))
			setIsItalic(document.queryCommandState('italic'))
			setIsUnderline(document.queryCommandState('underline'))
		}
	}

	const handleTextSelection = () => {
		const selection = window.getSelection()
		if (selection && selection.rangeCount > 0) {
			const range = selection.getRangeAt(0)
			const selectedNode = range.commonAncestorContainer

			const isInsideEditable = editableRefs.current.some(ref =>
				ref?.contains(selectedNode as Node)
			)

			if (isInsideEditable && selection.toString().length > 0) {
				const { x, y, height } = range.getBoundingClientRect()
				setMenuPosition({ x, y: y + height })
				setMenuVisible(true)
				checkStyleState()
			} else {
				setMenuVisible(false)
			}
		} else {
			setMenuVisible(false)
		}
	}

	const applyStyle = (command: string) => {
		document.execCommand(command)
		checkStyleState()
	}

	const applyColor = (color: string) => {
		document.execCommand('foreColor', false, color)
		setSelectedColor(color)
		checkStyleState()
	}

	const handleCheckIsEmpty = (e: React.SyntheticEvent<HTMLDivElement>) => {
		const target = e.currentTarget as HTMLDivElement
		if (target.innerHTML === '<br>') {
			target.innerHTML = ''
		}
	}

	const handleTextChange = (id: number, content: string) => {
		setElements(prev => {
			if (!prev) return prev
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
				return 'text-base'
		}
	}

	const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
		e.preventDefault()
		const text = e.clipboardData.getData('text/plain')
		document.execCommand('insertText', false, text)
	}

	useEffect(() => {
		document.addEventListener('click', handleTextSelection)
		return () => {
			document.removeEventListener('click', handleTextSelection)
		}
	}, [])

	return (
		<div className='flex justify-center py-4 pl-44 items-start w-full h-screen z-2'>
			<div className='flex flex-col w-[1000px] gap-1 px-12 justify-start items-start'>
				<div
					role='textbox'
					aria-multiline='true'
					className='no-outline content editable placeholder w-full text-[50px] bg-transparent resize-none text-center'
					contentEditable
					ref={el => {
						editableRefs.current[0] = el
					}}
					onInput={e => {
						changeHeading(e.currentTarget.textContent || 'New Space')
						handleCheckIsEmpty(e)
					}}
					onPaste={handlePaste}
					suppressContentEditableWarning={true}
				></div>

				{elements.map((elem, index) => (
					<SpaceElement
						key={elem.id}
						elem={elem}
						index={index}
						editableRefs={editableRefs}
						handleTextChange={handleTextChange}
						handleCheckIsEmpty={handleCheckIsEmpty}
						handlePaste={handlePaste}
						getStyles={getStyles}
					/>
				))}
			</div>

			<div
				style={{
					top: menuPosition.y,
					left: menuPosition.x,
				}}
				className={`menu ${
					isMenuVisible ? '' : 'opacity-0 pointer-events-none'
				} flex items-center transition-opacity duration-150 absolute bg-bg border-border border rounded-md`}
			>
				<button
					onClick={() => applyStyle('bold')}
					className={`${isBold ? 'text-second' : 'text-text'} pl-2 py-2 px-1`}
				>
					<FaBold size='20px' />
				</button>
				<button
					onClick={() => applyStyle('italic')}
					className={`${isItalic ? 'text-second' : 'text-text'} py-2 px-1`}
				>
					<FaItalic size='20px' />
				</button>
				<button
					onClick={() => applyStyle('underline')}
					className={`${
						isUnderline ? 'text-second' : 'text-text'
					} py-2 px-1 pr-2`}
				>
					<FaUnderline size='20px' />
				</button>
				<input
					type='color'
					value={selectedColor}
					onChange={e => applyColor(e.target.value)}
					className='w-8 h-8 cursor-pointer'
				/>
			</div>
		</div>
	)
}

export default SpaceElements
