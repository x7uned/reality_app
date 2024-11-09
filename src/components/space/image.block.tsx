import { useRef, useState } from 'react'

interface ImageBlockProps {
	elem: {
		id: number
		src: string
		width: number
		height: number
	}
	handleResize: (id: number, width: number, height: number) => void
}

const ImageBlock = ({ elem, handleResize }: ImageBlockProps) => {
	const [dimensions, setDimensions] = useState({
		width: elem.width,
		height: elem.height,
	})

	const imgRef = useRef<HTMLDivElement>(null)

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault()
		const startX = e.clientX
		const startY = e.clientY
		const startWidth = dimensions.width
		const startHeight = dimensions.height

		const handleMouseMove = (moveEvent: MouseEvent) => {
			const newWidth = startWidth + (moveEvent.clientX - startX)
			const newHeight = startHeight + (moveEvent.clientY - startY)

			setDimensions({
				width: Math.max(50, newWidth), // Минимальная ширина 50px
				height: Math.max(50, newHeight), // Минимальная высота 50px
			})
		}

		const handleMouseUp = () => {
			handleResize(elem.id, dimensions.width, dimensions.height)
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}

	return (
		<div
			className='relative group mt-2'
			style={{
				width: `${dimensions.width}px`,
				height: `${dimensions.height}px`,
			}}
			ref={imgRef}
		>
			<img
				src={
					elem.src ||
					'https://i.pinimg.com/564x/e5/20/2a/e5202afcec5f14b5cc4355f2dbcee81f.jpg'
				}
				alt='Resizable'
				className='w-full h-full object-cover rounded-md'
				draggable={false}
			/>
			{/* Handle for resizing */}
			<div
				className='absolute bottom-0 rounded-b-md right-0 w-full h-4 bg-gray-500 cursor-se-resize opacity-0 group-hover:opacity-45'
				draggable={false}
				onMouseDown={handleMouseDown}
			></div>
		</div>
	)
}

export default ImageBlock
