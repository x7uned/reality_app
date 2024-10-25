/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import CanvasBackground from '@/components/canvas.component'
import SpaceHeader from '@/components/space/space.header'
import SpaceElements from '@/components/space/space.elements'

export interface Space {
	id: number
	background: string
	name: string
}

export interface Element {
	id: number
	type: string
	content: string
}

const SpacePage = () => {
	const params = useParams<{ id: string }>()
	const [canDraw, setCanDraw] = useState(false)
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
	const [elements, setElements] = useState<Element[]>([])
	const canvasRef = useRef<{ clearCanvas: () => void } | null>(null)

	const clearCanvas = () => {
		if (canvasRef.current) {
			canvasRef.current.clearCanvas()
		}
	}

	useEffect(() => {
		const isChanged =
			space?.name !== saveSpace?.name ||
			space?.background !== saveSpace?.background
		setNeedToSave(isChanged)
	}, [space, saveSpace])

	useEffect(() => {
		setSpace(saveSpace)
	}, [])

	const handleSave = () => {
		setSaveSpace(space)
		setNeedToSave(false)
	}

	const addElement = (type: string) => {
		setElements(prev => [...prev, { id: Date.now(), content: '', type: type }])
	}

	return (
		<div className='flex'>
			<SpaceHeader
				canDraw={canDraw}
				setCanDraw={setCanDraw}
				clearCanvas={clearCanvas}
				isErasing={isErasing}
				setIsErasing={setIsErasing}
				color={color}
				setColor={setColor}
				lineWidth={lineWidth}
				setLineWidth={setLineWidth}
				addElement={addElement}
			/>
			<CanvasBackground
				ref={canvasRef}
				canDraw={canDraw}
				color={color}
				isErasing={isErasing}
				lineWidth={lineWidth}
			/>
			<SpaceElements
				space={space}
				setSpace={setSpace}
				elements={elements}
				setElements={setElements}
			/>

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
				<p onClick={() => console.log(elements)}>Eele</p>
			</div>
		</div>
	)
}

export default SpacePage
