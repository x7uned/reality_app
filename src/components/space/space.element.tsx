'use client'

import { Element } from '@/app/space/[id]/page'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
	CiTextAlignCenter,
	CiTextAlignLeft,
	CiTextAlignRight,
} from 'react-icons/ci'
import { IoIosArrowForward } from 'react-icons/io'
import {
	LuHeading1,
	LuHeading2,
	LuHeading3,
	LuHeading4,
	LuHeading5,
} from 'react-icons/lu'
import { MdDeleteOutline, MdOutlineLineStyle } from 'react-icons/md'

interface SpaceElementProps {
	elem: Element
	index: number
	editableRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
	handleTextChange: (id: number, content: string) => void
	handleCheckIsEmpty: (e: React.SyntheticEvent<HTMLDivElement>) => void
	handlePaste: (e: React.ClipboardEvent<HTMLDivElement>) => void
	getStyles: (type: string) => string
	removeElement: (id: number) => void
	changeTypeElement: (
		id: number,
		newType: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
	) => void
}

const SpaceElement = ({
	changeTypeElement,
	elem,
	index,
	editableRefs,
	handleTextChange,
	handleCheckIsEmpty,
	handlePaste,
	getStyles,
	removeElement,
}: SpaceElementProps) => {
	const [settingsMenu, setSettingsMenu] = useState(false)
	const [hoverButton, setHoverButton] = useState(false)
	const [typeMenu, setTypeMenu] = useState(false)
	const editableRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement
			if (settingsMenu && !target.closest('.settings-menu')) {
				setSettingsMenu(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [settingsMenu])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				event.key === 'Delete' &&
				document.activeElement === editableRef.current
			) {
				removeElement(elem.id)
				event.preventDefault()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [elem.id, removeElement])

	const handleTextAlign = (align: 'left' | 'center' | 'right') => {
		if (editableRefs.current[index + 1]) {
			editableRefs.current[index + 1]!.style.textAlign = align
			if (align == 'center') {
				editableRefs.current[index + 1]?.classList.remove('placeright')
				editableRefs.current[index + 1]?.classList.add('placecenter')
			} else if (align == 'right') {
				editableRefs.current[index + 1]?.classList.remove('placecenter')
				editableRefs.current[index + 1]?.classList.add('placeright')
			} else {
				editableRefs.current[index + 1]?.classList.remove('placeright')
				editableRefs.current[index + 1]?.classList.remove('placecenter')
			}
		}
	}

	return (
		<>
			<div
				onMouseEnter={() => setHoverButton(true)}
				onMouseLeave={() => setHoverButton(false)}
				className='flex relative w-full justify-center items-center'
			>
				<AnimatePresence>
					{settingsMenu && (
						<motion.div
							initial={{ opacity: 0, y: 0 }}
							animate={{ opacity: 1, y: 20 }}
							exit={{ opacity: 0, y: 0 }}
							transition={{ duration: 0.2 }}
							className='flex flex-col gap-1 cursor-pointer absolute left-[-80px] z-20 w-64 bg-bg rounded-lg shadow-md settings-menu'
						>
							<div
								className='flex p-1'
								onMouseLeave={() => setTypeMenu(false)}
								onMouseEnter={() => setTypeMenu(true)}
							>
								<div className='flex w-full px-2 hover:bg-bg2 rounded-md items-center justify-between h-8'>
									<p>Type</p>
									<div className='flex items-center text-subtext'>
										<p>{elem.type.toUpperCase()}</p>
										<IoIosArrowForward />
									</div>
								</div>
								{typeMenu && (
									<div className='flex w-32 left-60 absolute'>
										<motion.div
											initial={{ opacity: 0, x: 0 }}
											animate={{ opacity: 1, x: 20 }}
											exit={{ opacity: 0, x: 0 }}
											transition={{ duration: 0.2 }}
											className='flex flex-col gap-1 cursor-pointer z-20 w-64 bg-bg p-1 rounded-lg shadow-md settings-menu'
										>
											<div
												onClick={() => changeTypeElement(elem.id, 'h1')}
												className='flex w-full px-2 hover:bg-bg2 rounded-md gap-2 items-center justify-center h-8'
											>
												<LuHeading1 size='20px' />
												<p className='text-subtext'>Heading 1</p>
											</div>
											<div
												onClick={() => changeTypeElement(elem.id, 'h2')}
												className='flex w-full px-2 hover:bg-bg2 rounded-md gap-2 items-center justify-center h-8'
											>
												<LuHeading2 size='20px' />
												<p className='text-subtext'>Heading 2</p>
											</div>
											<div
												onClick={() => changeTypeElement(elem.id, 'h3')}
												className='flex w-full px-2 hover:bg-bg2 rounded-md gap-2 items-center justify-center h-8'
											>
												<LuHeading3 size='20px' />
												<p className='text-subtext'>Heading 3</p>
											</div>
											<div
												onClick={() => changeTypeElement(elem.id, 'h4')}
												className='flex w-full px-2 hover:bg-bg2 rounded-md gap-2 items-center justify-center h-8'
											>
												<LuHeading4 size='20px' />
												<p className='text-subtext'>Heading 4</p>
											</div>
											<div
												onClick={() => changeTypeElement(elem.id, 'h5')}
												className='flex w-full px-2 hover:bg-bg2 rounded-md gap-2 items-center justify-center h-8'
											>
												<LuHeading5 size='20px' />
												<p className='text-subtext'>Heading 5</p>
											</div>
										</motion.div>
									</div>
								)}
							</div>
							<div
								onClick={() => {
									removeElement(elem.id)
									setSettingsMenu(false)
								}}
								className='flex p-1 h-8 hover:bg-bg2 rounded-md items-center justify-between w-full'
							>
								<div className='flex items-center'>
									<div className='w-6'>
										<MdDeleteOutline size='20px' />
									</div>
									<p>Delete</p>
								</div>
								<p className='text-subtext'>Del</p>
							</div>
							<div className='flex flex-col items-center'>
								<div className='relative flex justify-center w-2/3'>
									<div className='absolute inset-0 flex items-center'>
										<div className='w-full border-t border-border'></div>
									</div>
									<span className='bg-bg relative px-1 text-subtext'>
										Text Align
									</span>
								</div>
								<div className='flex p-1'>
									<div
										className='flex items-center justify-between px-2 h-8 hover:bg-bg2 rounded-md cursor-pointer'
										onClick={() => handleTextAlign('left')}
									>
										<div className='flex items-center'>
											<CiTextAlignLeft size='20px' />
											<p className='ml-2'>Left</p>
										</div>
									</div>
									<div
										className='flex items-center justify-between px-2 h-8 hover:bg-bg2 rounded-md cursor-pointer'
										onClick={() => handleTextAlign('center')}
									>
										<div className='flex items-center'>
											<CiTextAlignCenter size='20px' />
											<p className='ml-2'>Center</p>
										</div>
									</div>
									<div
										className='flex items-center justify-between px-2 h-8 hover:bg-bg2 rounded-md cursor-pointer'
										onClick={() => handleTextAlign('right')}
									>
										<div className='flex items-center'>
											<CiTextAlignRight size='20px' />
											<p className='ml-2'>Right</p>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
				<div
					onClick={() => setSettingsMenu(true)}
					className={`flex left-24 mr-2 hover:bg-bg hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all ${
						hoverButton ? '' : 'opacity-0 pointer-events-none'
					}`}
				>
					<MdOutlineLineStyle size={'24px'} />
				</div>
				<div
					role='textbox'
					aria-multiline='true'
					contentEditable={true}
					suppressContentEditableWarning={true}
					className={`no-outline transition-all duration-200 focus:shadow dark:shadow-none bg-bg editable placeholder dark:focus:bg-bg px-2 py-1 pt-1 pl-1 mr-10 rounded-md w-2/3 text-start resize-none ${getStyles(
						elem.type
					)}`}
					ref={el => {
						editableRefs.current[index + 1] = el
						editableRef.current = el
					}}
					onInput={e => {
						handleTextChange(elem.id, e.currentTarget.innerHTML || 'New Text')
						handleCheckIsEmpty(e)
					}}
					onPaste={handlePaste}
				></div>
			</div>
		</>
	)
}

export default SpaceElement
