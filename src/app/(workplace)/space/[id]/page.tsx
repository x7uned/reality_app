/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import CanvasBackground from '@/components/canvas.component'
import { useSpaces } from '@/components/contexts/spaces.context'
import SpaceElements from '@/components/space/space.elements'
import SpaceHeader from '@/components/space/space.header'
import {
	fetchDeleteSpace,
	fetchGetSpaceById,
	fetchSaveSpace,
} from '@/lib/slices/space.slice'
import { useAppDispatch } from '@/lib/store'
import { Element, ElemType, IconType, Space } from '@/types/space'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const SpacePage = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { fetchSpacesData } = useSpaces()
	const params = useParams<{ id: string }>()
	const [canDraw, setCanDraw] = useState(false)
	const [color, setColor] = useState('#6e62e5')
	const [lineWidth, setLineWidth] = useState(6)
	const [isErasing, setIsErasing] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [saveSpace, setSaveSpace] = useState<Space>({
		id: 1,
		background: '',
		name: 'New Space',
		elements: [],
		icon: 'default',
	})
	const [space, setSpace] = useState<Space>({
		id: 1,
		background: '',
		name: 'New Space',
		elements: [],
		icon: 'default',
	})
	const [isLoading, setIsLoading] = useState(true)
	const [needToSave, setNeedToSave] = useState(false)
	const canvasRef = useRef<any>(null)

	const handleDeleteSpace = async () => {
		try {
			const fetch = await dispatch(fetchDeleteSpace(space.id))
			if (fetch?.payload.success) {
				router.push('/dashboard')
			} else {
				return false
			}
		} catch (error) {
			console.error(error)
		}
	}

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

	const handleChangeIcon = (icon: IconType) => {
		setSpace(prev => ({ ...prev, icon }))
	}

	const handleSave = async () => {
		if (isSaving) return
		setIsSaving(true) // Устанавливаем состояние загрузки
		try {
			const fetch = await dispatch(fetchSaveSpace({ ...space }))
			if (fetch?.payload.success) {
				setSaveSpace(space)
				setNeedToSave(false)
				fetchSpacesData()
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsSaving(false) // Сбрасываем состояние загрузки
		}
	}

	const changeHeading = (text: string) => {
		if (text.length > 0) {
			setSpace(prev =>
				prev
					? { ...prev, name: text }
					: { id: 0, background: '', name: text, elements: [], icon: 'default' }
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

	const addElement = (type: ElemType, content?: string) => {
		const newElement = {
			id: Date.now(),
			content: content || '',
			type,
			completed: false,
		}
		setSpace(prev =>
			prev
				? { ...prev, elements: [...prev.elements, newElement] }
				: {
						id: 0,
						icon: 'default',
						background: '',
						name: 'New Space',
						elements: [newElement],
				  }
		)
	}

	const setElements = (elements: Element[]) => {
		setSpace(prev =>
			prev
				? { ...prev, elements }
				: {
						id: 0,
						icon: 'default',
						background: '',
						name: 'New Space',
						elements: [],
				  }
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
		<div className='flex pl-48'>
			<SpaceHeader
				handleDeleteSpace={handleDeleteSpace}
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
				space={space}
				handleChangeIcon={handleChangeIcon}
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
				<p>Your space may be lost.</p>
				<button
					className={`bg-[var(--second)] w-full py-2 rounded-md mt-2 text-white ${
						isSaving ? 'opacity-50 cursor-not-allowed' : ''
					}`}
					onClick={handleSave}
					type='button'
					disabled={isSaving} // Отключаем кнопку во время загрузки
				>
					{isSaving ? 'Saving...' : 'Save'}
				</button>
			</div>
		</div>
	)
}

export default SpacePage
