import { HexColorPicker } from 'react-colorful'
import { TbBrush } from 'react-icons/tb'
import { RiDeleteBinLine, RiEraserLine } from 'react-icons/ri'
import {
	LuHeading1,
	LuHeading2,
	LuHeading3,
	LuHeading4,
	LuHeading5,
} from 'react-icons/lu'
import { useEffect, useState } from 'react'

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
	addElement: (type: string) => void
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
}: SpaceHeaderProps) => {
	const [picker, setPicker] = useState(false)

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

	return (
		<div className='flex z-10 items-center flex-col gap-1 w-56 bg-bg fixed h-screen py-2'>
			<p className='text-center'>Background</p>
			<div className='gap-1 w-full border-b pb-2 border-border justify-between px-4 flex items-center'>
				<div
					onClick={() => setCanDraw(!canDraw)}
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<TbBrush
						className={`${canDraw ? 'text-second' : ''}`}
						size={'20px'}
					/>
				</div>
				<div
					onClick={clearCanvas}
					className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
				>
					<RiDeleteBinLine className='cursor-pointer' size={'20px'} />
				</div>
				<div
					onClick={() => setIsErasing(!isErasing)}
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
						className='flex hover:bg-bg2 hover:shadow justify-center items-center duration-150 cursor-pointer h-8 w-8 rounded-md transition-all'
					>
						<div
							className='flex h-6 w-6 rounded-md '
							style={{ backgroundColor: color }}
						></div>
					</div>
					<div
						className={`absolute picker top-20 transition-all duration-200 ${
							picker ? '' : 'opacity-0 pointer-events-none'
						}`}
					>
						<HexColorPicker color={color} onChange={setColor} />
					</div>
				</>
				<input
					type='number'
					id='width'
					value={lineWidth}
					onChange={e => setLineWidth(Number(e.target.value))}
					className='w-8 h-8 bg-selection pl-1 outline-none rounded'
				/>
			</div>
			<p className='text-center'>Blocks</p>
			<div className='gap-1 w-full border-b pb-2 border-border justify-between px-4 flex items-center'>
				<LuHeading1
					className={`cursor-pointer`}
					size={'20px'}
					onClick={() => addElement('h1')}
				/>
				<LuHeading2
					className={`cursor-pointer`}
					size={'20px'}
					onClick={() => addElement('h2')}
				/>
				<LuHeading3
					className={`cursor-pointer`}
					size={'20px'}
					onClick={() => addElement('h3')}
				/>
				<LuHeading4
					className={`cursor-pointer`}
					size={'20px'}
					onClick={() => addElement('h4')}
				/>
				<LuHeading5
					className={`cursor-pointer`}
					size={'20px'}
					onClick={() => addElement('h5')}
				/>
			</div>
		</div>
	)
}

export default SpaceHeader
