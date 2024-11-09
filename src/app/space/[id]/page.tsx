/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import CanvasBackground from '@/components/canvas.component'
import SpaceElements from '@/components/space/space.elements'
import SpaceHeader from '@/components/space/space.header'
import { fetchGetSpaceById, fetchSaveSpace } from '@/lib/slices/space.slice'
import { useAppDispatch } from '@/lib/store'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export interface Space {
	id: number
	background: string
	name: string
	elements: Element[]
}

export type ElemType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'list' | 'checks'

export interface Element {
	id: number
	type: ElemType
	content: string
	completed?: boolean
	textAlign?: 'left' | 'center' | 'right'
}

const SpacePage = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
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
		elements: [],
	})
	const [isLoading, setIsLoading] = useState(true)
	const [needToSave, setNeedToSave] = useState(false)
	const canvasRef = useRef<{ clearCanvas: () => void } | null>(null)

	const clearCanvas = () => {
		canvasRef.current?.clearCanvas()
	}

	const setTextAlign = (id: number, type: 'left' | 'center' | 'right') => {
		const newElements = space.elements.map(element =>
			element.id === id ? { ...element, textAlign: type } : element
		)
		setSpace(prev => ({
			...prev,
			elements: newElements,
		}))
	}

	const fetchSpace = async (id: string): Promise<Space | null> => {
		try {
			const fetch = await dispatch(fetchGetSpaceById(Number(id)))
			return (fetch.payload.result as Space) || null
		} catch (error) {
			console.error(error)
			return null
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		const loadSpace = async () => {
			const fetchedSpace = await fetchSpace(params.id)
			if (fetchedSpace) {
				console.log(fetchedSpace)
				setSpace(fetchedSpace)
				setSaveSpace(fetchedSpace)
			} else {
				router.push('/space/notfound')
			}
		}
		loadSpace()
	}, [params.id])

	useEffect(() => {
		const isChanged = JSON.stringify(space) !== JSON.stringify(saveSpace)
		setNeedToSave(isChanged)
	}, [space, saveSpace])

	const handleSave = async () => {
		try {
			const fetch = await dispatch(fetchSaveSpace(space))
			if (fetch?.payload.success) {
				setSaveSpace(space)
				setNeedToSave(false)
			} else {
				return false
			}
		} catch (error) {
			// console.error(error)
		}
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

	const handleTextChange = (id: number, content: string) => {
		const newElements = space.elements.map(element =>
			element.id === id ? { ...element, content } : element
		)
		setSpace(prev => ({
			...prev,
			elements: newElements,
		}))
	}

	const changeTypeElement = (
		id: number,
		newType: ElemType,
		content: string
	) => {
		setSpace(prev => ({
			...prev,
			elements: prev.elements.map(element =>
				element.id === id
					? { ...element, type: newType, content: content }
					: element
			),
		}))
	}

	const addElement = (type: ElemType) => {
		const newElement = { id: Date.now(), content: '', type, completed: false }
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

	if (isLoading) {
		return (
			<div className='flex w-full h-screen bg-bg justify-center items-center'>
				<div className='loader'></div>
			</div>
		)
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
				name={saveSpace.name}
				changeTypeElement={changeTypeElement}
				changeHeading={changeHeading}
				elements={space?.elements}
				setElements={setElements}
				removeElement={removeElement}
				handleTextChange={handleTextChange}
				setTextAlign={setTextAlign}
			/>

			<div
				className={`flex transition-all duration-300 text-center flex-col fixed bottom-4 px-3 py-2 w-52 rounded-lg ${
					needToSave ? 'right-6' : 'right-[-400px] pointer-events-none'
				} bg-bg border border-border`}
			>
				<p onClick={() => console.log(space)}>Your space may be lost.</p>
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
