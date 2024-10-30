/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import CanvasBackground from '@/components/canvas.component'
import SpaceElements from '@/components/space/space.elements'
import SpaceHeader from '@/components/space/space.header'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

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
	const [space, setSpace] = useState<Space | undefined>()
	const [needToSave, setNeedToSave] = useState(false)
	const [elements, setElements] = useState<Element[]>([])
	const canvasRef = useRef<{ clearCanvas: () => void } | null>(null)

	const clearCanvas = () => {
		canvasRef.current?.clearCanvas()
	}

	useEffect(() => {
		setSpace(saveSpace)
	}, [])

	useEffect(() => {
		const isChanged =
			space?.name !== saveSpace?.name ||
			space?.background !== saveSpace?.background
		setNeedToSave(isChanged)
	}, [space, saveSpace])

	const handleSave = () => {
		setSaveSpace(space)
		setNeedToSave(false)
	}

	const changeHeading = (text: string) => {
		if (text.length > 0) {
			setSpace(prev =>
				prev ? { ...prev, name: text } : { id: 0, background: '', name: text }
			)
		}
	}

	const addElement = (type: string) => {
		const newElement = { id: Date.now(), content: '', type }
		setElements(prev => [...prev, newElement])
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
				changeHeading={changeHeading}
				elements={elements}
				setElements={setElements}
			/>

			<div
				className={`flex transition-all duration-300 text-center flex-col fixed bottom-4 px-3 py-2 w-52 rounded-lg ${
					needToSave ? 'right-6' : 'right-[-400px] pointer-events-none'
				} bg-bg border border-border`}
			>
				<p onClick={() => console.log(elements)}>Your space may be lost.</p>
				<button
					className='bg-[var(--second)] w-full py-2 rounded-md mt-2 text-white'
					onClick={handleSave}
					type='button'
				>
					Save
				</button>
			</div>
		</div>
	)
}

export default SpacePage
