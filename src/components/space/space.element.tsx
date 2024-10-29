'use client'

import { Element } from '@/app/space/[id]/page'
import { useState } from 'react'
import { MdOutlineLineStyle } from 'react-icons/md'

interface SpaceElementProps {
	elem: Element
	index: number
	editableRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
	handleTextChange: (id: number, content: string) => void
	handleCheckIsEmpty: (e: React.SyntheticEvent<HTMLDivElement>) => void
	handlePaste: (e: React.ClipboardEvent<HTMLDivElement>) => void
	getStyles: (type: string) => string
}

const SpaceElement = ({
	elem,
	index,
	editableRefs,
	handleTextChange,
	handleCheckIsEmpty,
	handlePaste,
	getStyles,
}: SpaceElementProps) => {
	const [hoverMenu, setHoverMenu] = useState(false)

	return (
		<div
			key={elem.id}
			onMouseEnter={() => setHoverMenu(true)}
			onMouseLeave={() => setHoverMenu(false)}
			className='flex w-full max-w-full h-full'
		>
			<div
				className={`flex pr-2 h-full flex-col justify-center duration-150 transition-all ${
					hoverMenu ? '' : 'opacity-0 pointer-events-none'
				}`}
			>
				<MdOutlineLineStyle size={'16px'} />
			</div>
			<div
				role='textbox'
				aria-multiline='true'
				contentEditable={true}
				suppressContentEditableWarning={true}
				className={`no-outline focus:shadow dark:shadow-none bg-bg editable placeholder dark:focus:bg-bg px-2 py-1 pt-1 pl-1 rounded-md w-full text-start resize-none ${getStyles(
					elem.type
				)}`}
				ref={el => {
					editableRefs.current[index + 1] = el
				}}
				onInput={e => {
					handleTextChange(elem.id, e.currentTarget.textContent || 'New Text')
					handleCheckIsEmpty(e)
				}}
				onPaste={handlePaste}
			></div>
		</div>
	)
}

export default SpaceElement
