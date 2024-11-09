import { Element } from '@/app/space/[id]/page'
import { useEffect } from 'react'
import ImageBlock from './image.block'

interface BlockSpaceProps {
	elem: Element
	editableRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
	editableRef: React.MutableRefObject<HTMLDivElement | null>
	handleTextChange: (id: number, content: string) => void
	handleCheckIsEmpty: (e: React.SyntheticEvent<HTMLDivElement>) => void
	index: number
	handlePaste: (e: React.ClipboardEvent<HTMLDivElement>) => void
	changeCheckBoxValue: (id: number) => void
	handleChangeSize: (id: number, width: number, height: number) => void
}

const BlockSpace = ({
	elem,
	editableRefs,
	editableRef,
	handleTextChange,
	handleCheckIsEmpty,
	index,
	handlePaste,
	changeCheckBoxValue,
	handleChangeSize,
}: BlockSpaceProps) => {
	useEffect(() => {
		if (editableRef.current) {
			editableRef.current.innerHTML = elem.content
		}
	}, [elem.content])

	switch (elem.type) {
		case 'h1':
			return (
				<div className='flex w-2/3 mr-10'>
					<div
						role='textbox'
						aria-multiline='true'
						contentEditable={true}
						suppressContentEditableWarning={true}
						className='no-outline transition-all duration-200 focus:shadow dark:shadow-none bg-bg editable placeholder dark:focus:bg-bg px-2 py-1 pt-1 pl-1 rounded-md w-full text-start text-3xl min-h-12'
						ref={el => {
							editableRefs.current[index + 1] = el
							editableRef.current = el
						}}
						// onInput={e => {
						// 	handleTextChange(elem.id, e.currentTarget.innerHTML)
						// 	handleCheckIsEmpty(e)
						// }}
						onBlur={e => {
							handleTextChange(elem.id, e.currentTarget.innerHTML)
							handleCheckIsEmpty(e)
						}}
						onPaste={handlePaste}
					></div>
				</div>
			)
		case 'h2':
			return (
				<div className='flex w-2/3 mr-10'>
					<div
						role='textbox'
						aria-multiline='true'
						contentEditable={true}
						suppressContentEditableWarning={true}
						className='no-outline transition-all duration-200 focus:shadow dark:shadow-none bg-bg editable placeholder dark:focus:bg-bg px-2 py-1 pt-1 pl-1 rounded-md w-full text-start text-2xl min-h-10'
						ref={el => {
							editableRefs.current[index + 1] = el
							editableRef.current = el
						}}
						onBlur={e => {
							handleTextChange(elem.id, e.currentTarget.innerHTML)
							handleCheckIsEmpty(e)
						}}
						onPaste={handlePaste}
					></div>
				</div>
			)
		case 'h3':
			return (
				<div className='flex w-2/3 mr-10'>
					<div
						role='textbox'
						aria-multiline='true'
						contentEditable={true}
						suppressContentEditableWarning={true}
						className='no-outline transition-all duration-200 focus:shadow dark:shadow-none bg-bg editable placeholder dark:focus:bg-bg px-2 py-1 pt-1 pl-1 rounded-md w-full text-start text-xl min-h-10'
						ref={el => {
							editableRefs.current[index + 1] = el
							editableRef.current = el
						}}
						onBlur={e => {
							handleTextChange(elem.id, e.currentTarget.innerHTML)
						}}
						onInput={e => handleCheckIsEmpty(e)}
						onPaste={handlePaste}
					></div>
				</div>
			)
		case 'h4':
			return (
				<div className='flex w-2/3 mr-10'>
					<div
						role='textbox'
						aria-multiline='true'
						contentEditable={true}
						suppressContentEditableWarning={true}
						className='no-outline transition-all duration-200 focus:shadow dark:shadow-none bg-bg editable placeholder dark:focus:bg-bg px-2 py-1 pt-1 pl-1 rounded-md w-full text-start text-lg min-h-8'
						ref={el => {
							editableRefs.current[index + 1] = el
							editableRef.current = el
						}}
						onBlur={e => {
							handleTextChange(elem.id, e.currentTarget.innerHTML)
						}}
						onInput={e => handleCheckIsEmpty(e)}
						onPaste={handlePaste}
					></div>
				</div>
			)
		case 'h5':
			return (
				<div className='flex w-2/3 mr-10'>
					<div
						role='textbox'
						aria-multiline='true'
						contentEditable={true}
						suppressContentEditableWarning={true}
						className='no-outline transition-all duration-200 focus:shadow dark:shadow-none bg-bg editable placeholder dark:focus:bg-bg px-2 py-1 pt-1 pl-1 rounded-md w-full text-start text-base min-h-8'
						ref={el => {
							editableRefs.current[index + 1] = el
							editableRef.current = el
						}}
						onBlur={e => {
							handleTextChange(elem.id, e.currentTarget.innerHTML)
						}}
						onInput={e => handleCheckIsEmpty(e)}
						onPaste={handlePaste}
					></div>
				</div>
			)
		case 'list':
			return (
				<div className='flex w-2/3 mr-10'>
					<div
						role='textbox'
						aria-multiline='true'
						contentEditable={true}
						suppressContentEditableWarning={true}
						className='list-item ml-5 no-outline transition-all duration-200 focus:shadow dark:shadow-none bg-bg editable placeholder dark:focus:bg-bg px-2 py-1 pt-1 pl-1 mr-10 rounded-md w-full text-start text-base min-h-8'
						ref={el => {
							editableRefs.current[index + 1] = el
							editableRef.current = el
						}}
						onBlur={e => {
							handleTextChange(elem.id, e.currentTarget.innerHTML)
						}}
						onInput={e => handleCheckIsEmpty(e)}
						onPaste={handlePaste}
					></div>
				</div>
			)
		case 'checks':
			return (
				<div className='flex w-2/3 mr-10'>
					<div
						role='textbox'
						aria-multiline='true'
						contentEditable={true}
						suppressContentEditableWarning={true}
						className='no-outline transition-all duration-200 focus:shadow dark:shadow-none bg-bg editable placeholder dark:focus:bg-bg px-2 py-1 pt-1 pl-1 mr-10 rounded-md w-full text-start text-base min-h-8'
						ref={el => {
							editableRefs.current[index + 1] = el
							editableRef.current = el
						}}
						defaultValue={elem.content}
						onInput={e => handleCheckIsEmpty(e)}
						onBlur={e => {
							handleTextChange(elem.id, e.currentTarget.innerHTML)
						}}
						onPaste={handlePaste}
					></div>
					<input
						type='checkbox'
						checked={elem.completed ? true : false}
						onChange={() => changeCheckBoxValue(elem.id)}
						className='mr-2'
					/>
				</div>
			)
		case 'nums':
			return (
				<div className='flex w-2/3 mr-10'>
					<div className='flex flex-col'>
						{/* Рендеринг номеров строк */}
						<div className='flex flex-col items-end pt-1'>
							{elem.content.split('</div>').map((_, index) => (
								<span key={index} className='text-gray-500'>
									{index + 1}.
								</span>
							))}
						</div>
					</div>
					<div
						role='textbox'
						aria-multiline='true'
						contentEditable={true}
						suppressContentEditableWarning={true}
						className='no-outline transition-all duration-200 focus:shadow dark:shadow-none bg-bg editable placeholder dark:focus:bg-bg px-2 py-1 pt-1 pl-1 rounded-md w-full text-start text-base min-h-8'
						ref={el => {
							editableRefs.current[index + 1] = el
							editableRef.current = el
						}}
						onBlur={e => {
							handleTextChange(elem.id, e.currentTarget.innerHTML)
						}}
						onInput={e => handleCheckIsEmpty(e)}
						onPaste={handlePaste}
					></div>
				</div>
			)
		case 'img':
			return (
				<ImageBlock
					elem={{
						id: elem.id,
						src: elem.content,
						width: elem.width || 300,
						height: elem.height || 200,
					}}
					handleResize={(id, width, height) =>
						handleChangeSize(id, width, height)
					}
				/>
			)
	}
}

export default BlockSpace
