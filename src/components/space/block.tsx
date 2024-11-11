'use client'

import { Element, ElemType } from '@/app/space/[id]/page'
import { fetchUploadImage } from '@/lib/slices/space.slice'
import { useAppDispatch } from '@/lib/store'
import {
	AnimatePresence,
	motion,
	Reorder,
	useDragControls,
	useMotionValue,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
	CiTextAlignCenter,
	CiTextAlignLeft,
	CiTextAlignRight,
} from 'react-icons/ci'
import { FaListCheck, FaListOl, FaListUl } from 'react-icons/fa6'
import { IoIosArrowForward } from 'react-icons/io'
import {
	LuHeading1,
	LuHeading2,
	LuHeading3,
	LuHeading4,
	LuHeading5,
	LuImagePlus,
} from 'react-icons/lu'
import { MdDeleteOutline, MdOutlineLineStyle } from 'react-icons/md'
import { PiCodeBlockBold } from 'react-icons/pi'
import { RxDragHandleDots2 } from 'react-icons/rx'
import BlockSpace from './block.inside'

interface BlockProps {
	elem: Element
	index: number
	editableRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
	handleTextChange: (id: number, content: string) => void
	handleCheckIsEmpty: (e: React.SyntheticEvent<HTMLDivElement>) => void
	handlePaste: (e: React.ClipboardEvent<HTMLDivElement>) => void
	removeElement: (id: number) => void
	changeTypeElement: (id: number, newType: ElemType, content: string) => void
	changeCheckBoxValue: (id: number) => void
	setTextAlign: (id: number, type: 'left' | 'center' | 'right') => void
	handleChangeSize: (id: number, width: number, height: number) => void
}

const Block = ({
	changeCheckBoxValue,
	changeTypeElement,
	elem,
	index,
	editableRefs,
	handleTextChange,
	handleCheckIsEmpty,
	handlePaste,
	removeElement,
	setTextAlign,
	handleChangeSize,
}: BlockProps) => {
	const [settingsMenu, setSettingsMenu] = useState(false)
	const [hoverButton, setHoverButton] = useState(false)
	const [typeMenu, setTypeMenu] = useState(false)
	const editableRef = useRef<HTMLDivElement | null>(null)
	const [fileErrorMessage, setFileErrorMessage] = useState('')
	const dispatch = useAppDispatch()

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

	useEffect(() => {
		handleTextAlign(elem.textAlign || 'left')
	}, [])

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
			setTextAlign(elem.id, align)
		}
	}

	const handleImageChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0]
		if (file) {
			try {
				const formData = new FormData()
				formData.append('file', file)
				const response = await dispatch(fetchUploadImage(formData))
				if (response.payload) {
					handleTextChange(
						elem.id,
						`http://localhost:4444/uploads/${response.payload}`
					)
				} else {
					setFileErrorMessage('Image upload failed (banner)')
				}
			} catch (error) {
				console.error(error)
				setFileErrorMessage('Error uploading image (banner)')
			}
		}
	}

	const y = useMotionValue(0)
	const controls = useDragControls()

	return (
		<Reorder.Item
			value={elem}
			id={elem.content}
			style={{ y }}
			dragListener={false}
			dragControls={controls}
		>
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
							className='flex flex-col gap-1 py-1 absolute left-[-100px] z-20 w-64 bg-bg rounded-lg shadow-md settings-menu'
						>
							<div className={`px-1 ${elem.type == 'img' ? 'flex' : 'hidden'}`}>
								<input
									type='file'
									accept='image/*'
									id='file-input'
									className='hidden'
									onChange={handleImageChange}
								/>
								<div
									onClick={() => document.getElementById('file-input')?.click()}
									className='flex cursor-pointer px-2 h-8 hover:bg-bg2 rounded-md items-center justify-between w-full'
								>
									<div className='flex items-center'>
										<div className='w-6'>
											<LuImagePlus size='20px' />
										</div>
										<p>Source</p>
										<p className='truncate'>{fileErrorMessage}</p>
									</div>
								</div>
							</div>
							<div
								className='flex p-1 pt-0 pb-0'
								onMouseLeave={() => setTypeMenu(false)}
								onMouseEnter={() => setTypeMenu(true)}
							>
								<div className='flex w-full px-2 hover:bg-bg2 rounded-md items-center justify-between h-8'>
									<div className='flex items-center'>
										<div className='w-6'>
											<PiCodeBlockBold size='20px' />
										</div>
										<p>Type</p>
									</div>
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
												onClick={() =>
													changeTypeElement(elem.id, 'h1', elem.content)
												}
												className='flex w-full px-2 hover:bg-bg2 rounded-md gap-2 items-center justify-start h-8'
											>
												<LuHeading1 size='20px' />
												<p className='text-subtext'>Heading 1</p>
											</div>
											<div
												onClick={() =>
													changeTypeElement(elem.id, 'h2', elem.content)
												}
												className='flex w-full px-2 hover:bg-bg2 rounded-md gap-2 items-center justify-start h-8'
											>
												<LuHeading2 size='20px' />
												<p className='text-subtext'>Heading 2</p>
											</div>
											<div
												onClick={() =>
													changeTypeElement(elem.id, 'h3', elem.content)
												}
												className='flex w-full px-2 hover:bg-bg2 rounded-md gap-2 items-center justify-start h-8'
											>
												<LuHeading3 size='20px' />
												<p className='text-subtext'>Heading 3</p>
											</div>
											<div
												onClick={() =>
													changeTypeElement(elem.id, 'h4', elem.content)
												}
												className='flex w-full px-2 hover:bg-bg2 rounded-md gap-2 items-center justify-start h-8'
											>
												<LuHeading4 size='20px' />
												<p className='text-subtext'>Heading 4</p>
											</div>
											<div
												onClick={() =>
													changeTypeElement(elem.id, 'h5', elem.content)
												}
												className='flex w-full px-2 hover:bg-bg2 rounded-md gap-2 items-center justify-start h-8'
											>
												<LuHeading5 size='20px' />
												<p className='text-subtext'>Heading 5</p>
											</div>
											<div
												onClick={() =>
													changeTypeElement(elem.id, 'list', elem.content)
												}
												className='flex w-full px-2 hover:bg-bg2 rounded-md gap-2 items-center justify-start h-8'
											>
												<FaListUl size='18px' />
												<p className='text-subtext'>Dot List</p>
											</div>
											<div
												onClick={() =>
													changeTypeElement(elem.id, 'checks', elem.content)
												}
												className='flex w-full px-2 hover:bg-bg2 rounded-md gap-2 items-center justify-start h-8'
											>
												<FaListCheck size='18px' />
												<p className='text-subtext'>Check list</p>
											</div>
											<div
												onClick={() =>
													changeTypeElement(elem.id, 'list', elem.content)
												}
												className='flex w-full px-2 hover:bg-bg2 rounded-md gap-2 items-center justify-start h-8'
											>
												<FaListOl size='18px' />
												<p className='text-subtext'>Nums List</p>
											</div>
										</motion.div>
									</div>
								)}
							</div>
							<div className='flex px-1 pb-1'>
								<div
									onClick={() => {
										removeElement(elem.id)
										setSettingsMenu(false)
									}}
									className='flex cursor-pointer px-2 h-8 hover:bg-bg2 rounded-md items-center justify-between w-full'
								>
									<div className='flex items-center'>
										<div className='w-6'>
											<MdDeleteOutline size='20px' />
										</div>
										<p>Delete</p>
									</div>
									<p className='text-subtext'>Del</p>
								</div>
							</div>
							<div
								className={`flex flex-col items-center ${
									elem.type == 'img' ? 'hidden' : ''
								}`}
							>
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
					onPointerDown={e => controls.start(e)}
					className={`reorder-handle flex left-24 mr-2 hover:bg-bg hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-6 rounded-md transition-all ${
						hoverButton ? '' : 'opacity-0 pointer-events-none'
					}`}
				>
					<RxDragHandleDots2 size={'24px'} />
				</div>
				<BlockSpace
					changeCheckBoxValue={changeCheckBoxValue}
					editableRefs={editableRefs}
					editableRef={editableRef}
					handlePaste={handlePaste}
					handleCheckIsEmpty={handleCheckIsEmpty}
					index={index}
					handleTextChange={handleTextChange}
					elem={elem}
					handleChangeSize={handleChangeSize}
				/>
			</div>
		</Reorder.Item>
	)
}

export default Block
