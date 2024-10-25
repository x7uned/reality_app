// components/SpaceHeader.tsx
import { TbBrush } from 'react-icons/tb'
import { RiDeleteBinLine, RiEraserLine } from 'react-icons/ri'
import {
	LuHeading1,
	LuHeading2,
	LuHeading3,
	LuHeading4,
	LuHeading5,
} from 'react-icons/lu'

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
	return (
		<div className='flex z-10 items-center flex-col gap-1 w-48 bg-bg fixed h-screen py-2'>
			<p className='text-center'>Background</p>
			<div className='gap-1 w-full border-b pb-2 border-border justify-between px-4 flex items-center'>
				<TbBrush
					className={`cursor-pointer ${canDraw ? 'text-second' : ''}`}
					size={'20px'}
					onClick={() => setCanDraw(!canDraw)}
				/>
				<RiDeleteBinLine
					className='cursor-pointer'
					size={'20px'}
					onClick={clearCanvas}
				/>
				<RiEraserLine
					className={`cursor-pointer ${isErasing ? 'text-second' : ''}`}
					size={'20px'}
					onClick={() => setIsErasing(!isErasing)}
				/>
				<input
					type='color'
					id='colorPicker'
					value={color}
					onChange={e => setColor(e.target.value)}
					className='w-6 rounded'
				/>
				<input
					type='number'
					id='width'
					value={lineWidth}
					onChange={e => setLineWidth(Number(e.target.value))}
					className='w-12 pl-1 bg-selection outline-none rounded'
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
