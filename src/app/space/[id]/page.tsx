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
	elements: Element[]
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
	const [saveSpace, setSaveSpace] = useState<Space>({
		id: 1,
		background: '',
		name: 'New Space',
		elements: [],
	})
	const [space, setSpace] = useState<Space>({
		id: 1,
		background: '',
		name: 'New Space',
		elements: [], // Инициализация массива элементов
	})
	const [needToSave, setNeedToSave] = useState(false)
	const canvasRef = useRef<{ clearCanvas: () => void } | null>(null)

	const clearCanvas = () => {
		canvasRef.current?.clearCanvas()
	}

	useEffect(() => {
		setSpace(saveSpace)
	}, [saveSpace])

	useEffect(() => {
		const isChanged =
			space.name !== saveSpace.name ||
			space.background !== saveSpace.background ||
			JSON.stringify(space.elements) !== JSON.stringify(saveSpace.elements)
		setNeedToSave(isChanged)
	}, [space, saveSpace])

	const handleSave = () => {
		setSaveSpace(space)
		setNeedToSave(false)
	}

	const changeHeading = (text: string) => {
		if (text.length > 0) {
			setSpace(prev =>
				prev
					? { ...prev, name: text }
					: { id: 0, background: '', name: text, elements: [] }
			)
		}
	}

	const addElement = (type: string) => {
		const newElement = { id: Date.now(), content: '', type }
		setSpace(prev =>
			prev
				? { ...prev, elements: [...prev.elements, newElement] }
				: { id: 0, background: '', name: 'New Space', elements: [newElement] }
		)
	}

	const setElements = (elements: Element[]) => {
		setSpace(prev =>
			prev
				? { ...prev, elements }
				: { id: 0, background: '', name: 'New Space', elements: [] }
		)
	}

	const removeElement = (id: number) => {
		setSpace(prev => ({
			...prev,
			elements: prev.elements.filter(element => element.id !== id),
		}))
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
				changeHeading={changeHeading}
				elements={space?.elements}
				setElements={setElements}
				removeElement={removeElement}
			/>

			<div
				className={`flex transition-all duration-300 text-center flex-col fixed bottom-4 px-3 py-2 w-52 rounded-lg ${
					needToSave ? 'right-6' : 'right-[-400px] pointer-events-none'
				} bg-bg border border-border`}
			>
				<p onClick={() => console.log(space?.elements)}>
					Your space may be lost.
				</p>
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
