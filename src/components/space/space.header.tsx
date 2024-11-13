import { ElemType, IconType, Space } from '@/app/space/[id]/page'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { FaImage, FaListCheck, FaListOl, FaListUl } from 'react-icons/fa6'
import {
	LuHeading1,
	LuHeading2,
	LuHeading3,
	LuHeading4,
	LuHeading5,
} from 'react-icons/lu'
import { MdDeleteOutline } from 'react-icons/md'
import { RiDeleteBinLine, RiEraserLine } from 'react-icons/ri'
import { TbBrush } from 'react-icons/tb'
import { useSpaces } from '../contexts/spaces.context'
import IconsComponent from './icons.component'

interface SpaceHeaderProps {
	canDraw: boolean
	setCanDraw: (value: boolean) => void
	clearCanvas: () => void
	isErasing: boolean
	setIsErasing: (value: boolean) => void
	color: string
	setColor: (value: string) => void
	lineWidth: number
	setLineWidth: (value: number) => void
	addElement: (type: ElemType) => void
	handleDeleteSpace: () => void
	space: Space
	handleChangeIcon: (icon: IconType) => void
}

const SpaceHeader = ({
	canDraw,
	setCanDraw,
	clearCanvas,
	isErasing,
	setIsErasing,
	color,
	setColor,
	lineWidth,
	setLineWidth,
	addElement,
	handleDeleteSpace,
	space,
	handleChangeIcon,
}: SpaceHeaderProps) => {
	const { fetchSpacesData } = useSpaces()
	const [picker, setPicker] = useState(false)
	const [iconMenu, setIconMenu] = useState(false)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement
			if (iconMenu && !target.closest('.iconMenu')) {
				setIconMenu(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [iconMenu])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement
			if (picker && !target.closest('.picker')) {
				setPicker(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [picker])

	const IconElem = ({ icon }: { icon: IconType }) => {
		return (
			<div
				onClick={() => handleChangeIcon(icon)}
				title={icon}
				className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
			>
				<IconsComponent icon={icon} active={space.icon == icon} />
			</div>
		)
	}

	return (
		<div className='flex z-10 items-center flex-col gap-1 w-56 bg-bg fixed h-screen py-2'>
			<p className='text-center'>Settings</p>
			<div className='gap-1 w-full border-b pb-2 border-border justify-between px-4 flex items-center'>
				<div
					onClick={() => {
						handleDeleteSpace()
						fetchSpacesData()
					}}
					title='Delete'
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<MdDeleteOutline className={`text-red-400`} size={'20px'} />
				</div>
				<div className='flex justify-center'>
					<div
						onClick={() => setIconMenu(true)}
						title='Icon'
						className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
					>
						<IconsComponent icon={space.icon} active={false} />
					</div>
					{iconMenu && (
						<motion.div
							initial={{ opacity: 0, y: 0 }}
							animate={{ opacity: 1, y: 20 }}
							exit={{ opacity: 0, y: 0 }}
							transition={{ duration: 0.2 }}
							className='iconMenu flex gap-1 py-1 px-2 rounded-md bg-bg absolute top-12'
						>
							<IconElem icon={'default'} />
							<IconElem icon={'body'} />
							<IconElem icon={'rocket'} />
							<IconElem icon={'heart'} />
							<IconElem icon={'bolt'} />
						</motion.div>
					)}
				</div>
			</div>
			<p className='text-center'>Background</p>
			<div className='gap-1 w-full border-b pb-2 border-border justify-between px-4 flex items-center'>
				<div
					onClick={() => setCanDraw(!canDraw)}
					title='Draw Mode'
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<TbBrush
						className={`${canDraw ? 'text-second' : ''}`}
						size={'20px'}
					/>
				</div>
				<div
					onClick={clearCanvas}
					title='Clear Canvas'
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<RiDeleteBinLine className='cursor-pointer' size={'20px'} />
				</div>
				<div
					onClick={() => setIsErasing(!isErasing)}
					title='Eraser'
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<RiEraserLine
						className={`cursor-pointer ${isErasing ? 'text-second' : ''}`}
						size={'20px'}
					/>
				</div>
				<>
					<div
						onClick={() => setPicker(!picker)}
						title='Pick a Color'
						className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
					>
						<div
							className='flex h-6 w-6 rounded-md '
							style={{ backgroundColor: color }}
						></div>
					</div>
					<div
						className={`absolute picker top-36 transition-all duration-200 ${
							picker ? '' : 'opacity-0 pointer-events-none'
						}`}
					>
						<HexColorPicker color={color} onChange={setColor} />
					</div>
				</>
				<input
					type='number'
					id='width'
					title='Line Width'
					value={lineWidth}
					onChange={e => setLineWidth(Number(e.target.value))}
					className='w-8 h-8 bg-selection pl-1 outline-none rounded'
				/>
			</div>
			<p className='text-center'>Blocks</p>
			<div className='gap-1 w-full  justify-between px-4 flex items-center'>
				<div
					onClick={() => addElement('h1')}
					title='Add Heading 1'
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<LuHeading1 size={'20px'} />
				</div>
				<div
					onClick={() => addElement('h2')}
					title='Add Heading 2'
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<LuHeading2 size={'20px'} />
				</div>
				<div
					onClick={() => addElement('h3')}
					title='Add Heading 3'
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<LuHeading3 size={'20px'} />
				</div>
				<div
					onClick={() => addElement('h4')}
					title='Add Heading 4'
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<LuHeading4 size={'20px'} />
				</div>
				<div
					onClick={() => addElement('h5')}
					title='Add Heading 5'
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<LuHeading5 size={'20px'} />
				</div>
			</div>
			<div className='gap-1 w-full pb-2 justify-between px-4 flex items-center'>
				<div
					onClick={() => addElement('list')}
					title='Add Unordered List'
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<FaListUl size={'18px'} />
				</div>
				<div
					onClick={() => addElement('checks')}
					title='Add Checklist'
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<FaListCheck size={'18px'} />
				</div>
				<div
					onClick={() => addElement('nums')}
					title='Add Ordered List'
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<FaListOl size={'18px'} />
				</div>
				<div
					onClick={() => addElement('img')}
					title='Add Image'
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<FaImage size={'18px'} />
				</div>
			</div>
		</div>
	)
}

export default SpaceHeader
