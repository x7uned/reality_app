'use client'

import { Element, Space } from '@/app/space/[id]/page'
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa6'
import SpaceElement from './space.element'
import { HexColorPicker } from 'react-colorful'

interface SpaceElementsProps {
	space: Space | undefined
	elements: Element[]
	setElements: Dispatch<SetStateAction<Element[]>>
	changeHeading: (text: string) => void
	removeElement: (id: number) => void
}

const SpaceElements = ({
	space,
	changeHeading,
	elements,
	setElements,
	removeElement,
}: SpaceElementsProps) => {
	const [isMenuVisible, setMenuVisible] = useState(false)
	const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
	const editableRefs = useRef<(HTMLDivElement | null)[]>([])
	const menuRef = useRef<HTMLDivElement | null>(null)
	const pickerRef = useRef<HTMLDivElement | null>(null)

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
				// Добавляем проверку на клик вне меню и пикера
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
		if (selection && selection.rangeCount > 0) {
			const range = selection.getRangeAt(0)
			const span = document.createElement('span')
			span.style.color = color
			range.surroundContents(span)
			setSelectedColor(color)
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

	const handleTextChange = (id: number, content: string) => {
		setElements(prev => {
			if (!prev) return prev
			return prev.map(element =>
				element.id === id ? { ...element, content } : element
			)
		})
	}

	const clearSelection = () => {
		const selection = window.getSelection()
		if (selection) {
			selection.removeAllRanges()
		}
	}

	const getStyles = (type: string) => {
		switch (type) {
			case 'h1':
				return 'text-3xl min-h-12'
			case 'h2':
				return 'text-2xl min-h-10'
			case 'h3':
				return 'text-xl min-h-10'
			case 'h4':
				return 'text-lg min-h-8'
			case 'h5':
				return 'text-base min-h-8'
			default:
				return 'text-base min-h-6'
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
	}, [handleTextSelection])

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
						removeElement={removeElement}
						getStyles={getStyles}
					/>
				))}
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
				<button
					onClick={() => {
						applyStyle('bold')
						console.log(selectedColor)
					}}
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
				<>
					<div
						onClick={() => setPicker(!picker)}
						onMouseDown={e => e.preventDefault()}
						className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
					>
						<div
							className={`flex h-6 w-6 rounded-md`}
							style={{ backgroundColor: selectedColor }}
						></div>
					</div>
					<div
						className={`absolute top-20 transition-all duration-200 ${
							picker ? '' : 'opacity-0 pointer-events-none'
						}`}
					>
						<div ref={pickerRef} className='flex'>
							<HexColorPicker
								color={selectedColor}
								onChange={e => setSelectedColor(e)}
								onBlur={() => applyColor(selectedColor)}
							/>
						</div>
					</div>
				</>
			</div>
		</div>
	)
}

export default SpaceElements
