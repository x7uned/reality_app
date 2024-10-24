'use client'

import CanvasBackground from '@/components/canvas.component'
import { useParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { RiDeleteBinLine, RiEraserLine } from 'react-icons/ri'
import { TbBrush } from 'react-icons/tb'

const SpacePage = () => {
	const params = useParams<{ id: string }>()
	const [canDraw, setCanDraw] = useState(true)
	const [color, setColor] = useState('#6e62e5')
	const [lineWidth, setLineWidth] = useState(6)
	const [isErasing, setIsErasing] = useState(false)
	const canvasRef = useRef<{ clearCanvas: () => void } | null>(null)

	const clearCanvas = () => {
		if (canvasRef.current) {
			canvasRef.current.clearCanvas()
		}
	}

	return (
		<div className='flex'>
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
						onClick={() => setIsErasing(prev => !prev)}
					/>
					<input
						type='color'
						id='colorPicker'
						value={color}
						onChange={e => setColor(e.target.value)} // Обновляем цвет
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
			</div>
			<p>{params.id}</p>
			<CanvasBackground
				ref={canvasRef}
				canDraw={canDraw}
				color={color}
				isErasing={isErasing}
				lineWidth={lineWidth}
			/>
			<div className='flex justify-center items-center w-full h-screen pointer-events-none z-2'>
				<input type='text' className='bg-transparent' placeholder='Heading' />
			</div>
		</div>
	)
}

export default SpacePage
