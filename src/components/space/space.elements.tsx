'use client'

import { Element, ElemType } from '@/app/space/[id]/page'
import { Reorder } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa6'
import Block from './block'

interface SpaceElementsProps {
	name: string
	elements: Element[] | undefined
	setElements: (elements: Element[]) => void
	changeHeading: (text: string) => void
	removeElement: (id: number) => void
	changeTypeElement: (id: number, newType: ElemType, content: string) => void
	handleTextChange: (id: number, content: string) => void
	setTextAlign: (id: number, type: 'left' | 'center' | 'right') => void
}

const SpaceElements = ({
	name,
	changeTypeElement,
	changeHeading,
	elements,
	setElements,
	removeElement,
	handleTextChange,
	setTextAlign,
}: SpaceElementsProps) => {
	const [isMenuVisible, setMenuVisible] = useState(false)
	const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
	const editableRefs = useRef<(HTMLDivElement | null)[]>([])
	const menuRef = useRef<HTMLDivElement | null>(null)
	const pickerRef = useRef<HTMLDivElement | null>(null)
	const titleRef = useRef<HTMLDivElement | null>(null)

	const [isBold, setIsBold] = useState(false)
	const [isItalic, setIsItalic] = useState(false)
	const [isUnderline, setIsUnderline] = useState(false)
	const [selectedColor, setSelectedColor] = useState('#000000')
	const [picker, setPicker] = useState(false)

	const checkStyleState = useCallback(() => {
		const selection = window.getSelection()
		if (selection && selection.rangeCount > 0) {
			setIsBold(document.queryCommandState('bold'))
			setIsItalic(document.queryCommandState('italic'))
			setIsUnderline(document.queryCommandState('underline'))
		}
	}, [])

	const changeCheckBoxValue = (id: number) => {
		if (Array.isArray(elements)) {
			setElements(
				elements.map(element =>
					element.id === id
						? { ...element, completed: !element.completed }
						: element
				)
			)
		}
	}

	const handleChangeSize = (id: number, width: number, height: number) => {
		if (Array.isArray(elements)) {
			setElements(
				elements.map(element =>
					element.id === id ? { ...element, width, height } : element
				)
			)

			console.log(elements)
		}
	}

	const handleTextSelection = useCallback(() => {
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
			} else if (
				!menuRef.current?.contains(selectedNode as Node) &&
				!pickerRef.current?.contains(selectedNode as Node)
			) {
				setMenuVisible(false)
				setPicker(false)
			}
		} else {
			setMenuVisible(false)
			setPicker(false)
		}
	}, [checkStyleState])

	const applyStyle = (command: string) => {
		document.execCommand(command)
		checkStyleState()
	}

	const applyColor = (color: string) => {
		const selection = window.getSelection()
		setSelectedColor(color)
		if (selection && selection.rangeCount > 0) {
			document.execCommand('styleWithCSS', false, 'true')
			document.execCommand('foreColor', false, color)
			checkStyleState()
		}
	}

	const handleCheckIsEmpty = (e: React.SyntheticEvent<HTMLDivElement>) => {
		const target = e.currentTarget as HTMLDivElement
		if (
			target.innerHTML.trim() === '<br>' ||
			target.innerHTML.trim() === '<div><br></div>'
		) {
			target.innerHTML = ''
		}
	}

	// const clearSelection = () => {
	// 	const selection = window.getSelection()
	// 	if (selection) {
	// 		selection.removeAllRanges()
	// 	}
	// }

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
	}, [handleTextSelection])

	useEffect(() => {
		if (titleRef.current) {
			titleRef.current.innerHTML = name
		}
	}, [name])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const selectedNode = event.target as Node
			if (
				!menuRef.current?.contains(selectedNode) &&
				!pickerRef.current?.contains(selectedNode)
			) {
				setMenuVisible(false)
				setPicker(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div className='flex justify-center py-4 pl-72 items-start w-full h-screen z-2'>
			<div className='flex flex-col w-full gap-1 px-12 justify-start items-center'>
				<div
					role='textbox'
					aria-multiline='true'
					className='no-outline min-h-20 w-2/3 content editable placeholder text-[50px] bg-transparent resize-none text-center'
					contentEditable
					ref={titleRef}
					onInput={e => {
						changeHeading(e.currentTarget.textContent || 'New Space')
						handleCheckIsEmpty(e)
					}}
					onPaste={handlePaste}
					suppressContentEditableWarning={true}
				></div>
				{Array.isArray(elements) && (
					<Reorder.Group
						className='w-full'
						axis='y'
						onReorder={setElements}
						values={elements}
					>
						{elements.map((elem, index) => (
							<Block
								key={elem.id}
								elem={elem}
								index={index}
								changeTypeElement={changeTypeElement}
								editableRefs={editableRefs}
								handleTextChange={handleTextChange}
								handleCheckIsEmpty={handleCheckIsEmpty}
								handlePaste={handlePaste}
								handleChangeSize={handleChangeSize}
								removeElement={removeElement}
								changeCheckBoxValue={changeCheckBoxValue}
								setTextAlign={setTextAlign}
							/>
						))}
					</Reorder.Group>
				)}
			</div>

			<div
				ref={menuRef} // Привязка ref для меню
				style={{
					top: menuPosition.y,
					left: menuPosition.x,
				}}
				className={`menu ${
					isMenuVisible ? '' : 'opacity-0 pointer-events-none'
				} flex items-center transition-opacity duration-150 absolute bg-bg border-border border rounded-md`}
			>
				<div
					onMouseDown={e => {
						e.preventDefault()
						applyStyle('bold')
					}}
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<button
						className={`${isBold ? 'text-second' : 'text-text'} pl-2 py-2 px-1`}
					>
						<FaBold size='20px' />
					</button>
				</div>

				<div
					onMouseDown={e => {
						e.preventDefault()
						applyStyle('italic')
					}}
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<button
						className={`${isItalic ? 'text-second' : 'text-text'} py-2 px-1`}
					>
						<FaItalic size='20px' />
					</button>
				</div>

				<div
					onMouseDown={e => {
						e.preventDefault()
						applyStyle('italic')
					}}
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<button
						className={`${isUnderline ? 'text-second' : 'text-text'} py-2 px-1`}
					>
						<FaUnderline size='20px' />
					</button>
				</div>

				<div
					onClick={() => setPicker(!picker)}
					onMouseDown={e => e.preventDefault()}
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<div
						className='flex h-6 w-6 rounded-md'
						style={{ backgroundColor: selectedColor }}
					></div>
				</div>

				<div
					onMouseDown={e => e.preventDefault()}
					className={`absolute top-12 transition-all duration-200 ${
						picker ? '' : 'opacity-0 pointer-events-none'
					}`}
				>
					<div ref={pickerRef} className='flex'>
						<HexColorPicker
							color={selectedColor}
							onChange={e => applyColor(e)}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SpaceElements
