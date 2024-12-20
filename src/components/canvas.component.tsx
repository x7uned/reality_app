'use client'

import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

interface CanvasBackgroundProps {
	canDraw: boolean
	color: string
	isErasing: boolean
	lineWidth: number // Новый пропс для толщины линии
}

const CanvasBackground = forwardRef((props: CanvasBackgroundProps, ref) => {
	const { canDraw, color, isErasing, lineWidth } = props
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const contextRef = useRef<CanvasRenderingContext2D | null>(null)
	const [isDrawing, setIsDrawing] = useState(false)

	// Настройка холста при первом рендере
	useEffect(() => {
		const canvas = canvasRef.current
		if (canvas) {
			canvas.width = window.innerWidth * 2
			canvas.height = window.innerHeight * 2
			canvas.style.width = `${window.innerWidth}px`
			canvas.style.height = `${window.innerHeight}px`

			const context = canvas.getContext('2d')
			if (context) {
				context.scale(2, 2)
				context.lineCap = 'round'
				contextRef.current = context
			}
		}
	}, [])

	// Настройка режима рисования/стирания и толщины линии
	useEffect(() => {
		if (contextRef.current) {
			if (isErasing) {
				contextRef.current.globalCompositeOperation = 'destination-out' // Ластик
			} else {
				contextRef.current.globalCompositeOperation = 'source-over' // Обычное рисование
				contextRef.current.strokeStyle = color // Устанавливаем цвет кисти
			}
			contextRef.current.lineWidth = lineWidth // Устанавливаем толщину линии
		}
	}, [isErasing, color, lineWidth])

	const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
		if (!canDraw) return
		const { offsetX, offsetY } = event.nativeEvent
		if (contextRef.current) {
			contextRef.current.beginPath()
			contextRef.current.moveTo(offsetX, offsetY)
			setIsDrawing(true)
		}
	}

	const finishDrawing = () => {
		if (contextRef.current) {
			contextRef.current.closePath()
		}
		setIsDrawing(false)
	}

	const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
		if (!isDrawing || !contextRef.current) return
		const { offsetX, offsetY } = event.nativeEvent
		contextRef.current.lineTo(offsetX, offsetY)
		contextRef.current.stroke()
	}

	useImperativeHandle(ref, () => ({
		clearCanvas: () => {
			const canvas = canvasRef.current
			if (canvas && contextRef.current) {
				contextRef.current.clearRect(0, 0, canvas.width, canvas.height)
			}
		},
		saveCanvas: () => {
			const canvas = canvasRef.current
			if (canvas) {
				return canvas.toDataURL('image/png') // Сохраняем в формате PNG
			}
			return null
		},
		loadCanvas: (dataURL: string) => {
			const canvas = canvasRef.current
			const context = contextRef.current
			if (canvas && context) {
				const image = new Image()
				image.onload = () => {
					context.clearRect(0, 0, canvas.width, canvas.height)
					context.drawImage(image, 0, 0)
				}
				image.src = dataURL // Загружаем изображение
			}
		},
	}))

	return (
		<canvas
			ref={canvasRef}
			onMouseDown={startDrawing}
			onMouseUp={finishDrawing}
			onMouseMove={draw}
			onMouseLeave={finishDrawing}
			className='absolute top-0 left-0 w-full h-full'
			style={{
				zIndex: canDraw ? 4 : -1,
			}}
		/>
	)
})

CanvasBackground.displayName = 'CanvasBackground'

export default CanvasBackground
