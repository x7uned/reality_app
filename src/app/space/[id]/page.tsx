'use client'

import CanvasBackground from '@/components/canvas.component'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { RiDeleteBinLine, RiEraserLine } from 'react-icons/ri'
import { TbBrush } from 'react-icons/tb'

interface Space {
	id: number
	background: string
	name: string
}

const SpacePage = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const params = useParams<{ id: string }>()
	const [canDraw, setCanDraw] = useState(true)
	const [color, setColor] = useState('#6e62e5')
	const [lineWidth, setLineWidth] = useState(6)
	const [isErasing, setIsErasing] = useState(false)
	const [saveSpace, setSaveSpace] = useState<Space | undefined>({
		id: 1,
		background: '',
		name: 'New Space',
	})
	const [space, setSpace] = useState<Space | undefined>(undefined)
	const [needToSave, setNeedToSave] = useState(false)
	const canvasRef = useRef<{ clearCanvas: () => void } | null>(null)

	const clearCanvas = () => {
		if (canvasRef.current) {
			canvasRef.current.clearCanvas()
		}
	}

	// Проверяем изменения после каждого изменения `space`
	useEffect(() => {
		const isChanged =
			space?.name !== saveSpace?.name ||
			space?.background !== saveSpace?.background
		setNeedToSave(isChanged)
	}, [space, saveSpace])

	// Устанавливаем начальное значение `space` при загрузке компонента
	useEffect(() => {
		setSpace(saveSpace)
	}, [])

	// Функция сохранения данных
	const handleSave = () => {
		setSaveSpace(space)
		setNeedToSave(false)
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
				<p onClick={() => console.log(space, saveSpace, needToSave)}>console</p>
			</div>
			<CanvasBackground
				ref={canvasRef}
				canDraw={canDraw}
				color={color}
				isErasing={isErasing}
				lineWidth={lineWidth}
			/>
			<div className='flex justify-center py-4 items-start w-screen h-screen z-2'>
				<div className='flex flex-col w-[1000px] px-12 justify-start items-center'>
					<textarea
						className='outline-0 w-full placeholder:pt-8 placeholder:text-[80px] text-[80px] bg-transparent leading-none text-center resize-none overflow-hidden'
						id='heading'
						placeholder='New space'
						maxLength={50}
						rows={1}
						value={space?.name || ''}
						onChange={e =>
							setSpace(prev =>
								prev
									? { ...prev, name: e.target.value }
									: { id: Date.now(), background: '', name: e.target.value }
							)
						}
						onInput={e => {
							const target = e.target as HTMLTextAreaElement
							target.style.height = 'auto'
							target.style.height = `${target.scrollHeight}px`
						}}
					/>
				</div>
			</div>

			<div
				className={`flex transition-all duration-300 text-center flex-col fixed bottom-4 px-3 py-2 w-52 rounded-lg ${
					needToSave ? 'right-6' : 'right-[-400px] pointer-events-none'
				} bg-bg border border-border `}
			>
				<p>Your space may be lost.</p>
				<button
					className='bg-[var(--second)] w-full py-2 rounded-md mt-2 text-white'
					onClick={handleSave}
					type='submit'
				>
					Save
				</button>
			</div>
		</div>
	)
}

export default SpacePage
