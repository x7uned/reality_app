'use client'

import { Element } from '@/app/space/[id]/page'
import { useState, useEffect } from 'react'
import { MdDeleteOutline, MdOutlineLineStyle } from 'react-icons/md'
import {
	CiTextAlignCenter,
	CiTextAlignLeft,
	CiTextAlignRight,
} from 'react-icons/ci'
import { motion, AnimatePresence } from 'framer-motion'

interface SpaceElementProps {
	elem: Element
	index: number
	editableRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
	handleTextChange: (id: number, content: string) => void
	handleCheckIsEmpty: (e: React.SyntheticEvent<HTMLDivElement>) => void
	handlePaste: (e: React.ClipboardEvent<HTMLDivElement>) => void
	getStyles: (type: string) => string
}

const SpaceElement = ({
	elem,
	index,
	editableRefs,
	handleTextChange,
	handleCheckIsEmpty,
	handlePaste,
	getStyles,
}: SpaceElementProps) => {
	const [settingsMenu, setSettingsMenu] = useState(false)
	const [hoverButton, setHoverButton] = useState(false)
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
				className='flex relative w-full max-w-full items-center'
			>
				<AnimatePresence>
					{settingsMenu && (
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 20 }}
							transition={{ duration: 0.2 }}
							className='flex flex-col gap-1 cursor-pointer absolute left-[-270px] z-20 w-64 bg-bg p-1 rounded-lg shadow-md settings-menu'
						>
							<div className='flex px-2 h-8 hover:bg-bg2 rounded-md items-center justify-between w-full'>
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
								<div className='flex'>
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
					className={`flex mr-2 hover:bg-bg hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all ${
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
					className={`no-outline focus:shadow dark:shadow-none bg-bg editable placeholder dark:focus:bg-bg px-2 py-1 pt-1 pl-1 rounded-md w-full text-start resize-none ${getStyles(
						elem.type
					)}`}
					ref={el => {
						editableRefs.current[index + 1] = el
					}}
					onInput={e => {
						handleTextChange(elem.id, e.currentTarget.textContent || 'New Text')
						handleCheckIsEmpty(e)
					}}
					onPaste={handlePaste}
				></div>
			</div>
		</>
	)
}

export default SpaceElement
