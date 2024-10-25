import { Element } from '@/app/space/[id]/page'
import { Dispatch, SetStateAction } from 'react'

interface SpaceElementsProps {
	space: { name: string } | undefined
	elements: Element[]
	setElements: Dispatch<SetStateAction<Element[]>>
	setSpace: Dispatch<
		SetStateAction<{ id: number; background: string; name: string } | undefined>
	>
}

const getStyles = (type: string) => {
	switch (type) {
		case 'h1':
			return 'text-3xl placeholder:text-3xl'
		case 'h2':
			return 'text-2xl placeholder:text-2xl'
		case 'h3':
			return 'text-xl placeholder:text-xl'
		case 'h4':
			return 'text-lg placeholder:text-lg'
		case 'h5':
			return 'text-base placeholder:text-base'
		default:
			return 'text-base placeholder:text-base' // стандартный стиль для текстового поля
	}
}

const SpaceElements = ({
	space,
	setSpace,
	elements,
	setElements,
}: SpaceElementsProps) => {
	const handleTextChange = (id: number, value: string) => {
		setElements(prev =>
			prev.map(element =>
				element.id === id ? { ...element, content: value } : element
			)
		)
	}

	return (
		<div className='flex justify-center py-4 items-start w-screen h-screen z-2'>
			<div className='flex flex-col w-[1000px] px-12 justify-start items-start'>
				<textarea
					className='outline-0 w-full placeholder:pt-8 placeholder:text-[80px] text-[80px] bg-transparent leading-none text-center resize-none overflow-hidden'
					id='heading'
					placeholder='New Space'
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
				{/* Динамическое отображение элементов */}
				{elements.map(elem => (
					<div key={elem.id} className='flex'>
						<textarea
							className={`outline-0 w-full ${getStyles(
								elem.type
							)} bg-transparent text-start resize-none overflow-hidden my-2`}
							placeholder={`🖊 ${elem.type}`}
							rows={1}
							value={elem.content}
							onChange={e => handleTextChange(elem.id, e.target.value)}
							onInput={e => {
								const target = e.target as HTMLTextAreaElement
								target.style.height = 'auto'
								target.style.height = `${target.scrollHeight}px`
							}}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default SpaceElements
