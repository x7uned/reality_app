import { Element } from '@/app/space/[id]/page'

interface BlockSpaceProps {
	elem: Element
	editableRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
	editableRef: React.MutableRefObject<HTMLDivElement | null>
	handleTextChange: (id: number, content: string) => void
	handleCheckIsEmpty: (e: React.SyntheticEvent<HTMLDivElement>) => void
	index: number
	handlePaste: (e: React.ClipboardEvent<HTMLDivElement>) => void
	changeCheckBoxValue: (id: number) => void
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
}: BlockSpaceProps) => {
	switch (elem.type) {
		case 'h1':
			return (
				<div
					role='textbox'
					aria-multiline='true'
					contentEditable={true}
					suppressContentEditableWarning={true}
					className='no-outline transition-all duration-200 focus:shadow dark:shadow-none bg-bg editable placeholder dark:focus:bg-bg px-2 py-1 pt-1 pl-1 mr-10 rounded-md w-2/3 text-start text-3xl min-h-12'
					ref={el => {
						editableRefs.current[index + 1] = el
						editableRef.current = el
					}}
					onInput={e => {
						handleTextChange(elem.id, e.currentTarget.innerHTML || 'New Text')
						handleCheckIsEmpty(e)
					}}
					onPaste={handlePaste}
				></div>
			)
		case 'h2':
			return (
				<div
					role='textbox'
					aria-multiline='true'
					contentEditable={true}
					suppressContentEditableWarning={true}
					className='no-outline transition-all duration-200 focus:shadow dark:shadow-none bg-bg editable placeholder dark:focus:bg-bg px-2 py-1 pt-1 pl-1 mr-10 rounded-md w-2/3 text-start text-2xl min-h-10'
					ref={el => {
						editableRefs.current[index + 1] = el
						editableRef.current = el
					}}
					onInput={e => {
						handleTextChange(elem.id, e.currentTarget.innerHTML || 'New Text')
						handleCheckIsEmpty(e)
					}}
					onPaste={handlePaste}
				></div>
			)
		case 'h3':
			return (
				<div
					role='textbox'
					aria-multiline='true'
					contentEditable={true}
					suppressContentEditableWarning={true}
					className='no-outline transition-all duration-200 focus:shadow dark:shadow-none bg-bg editable placeholder dark:focus:bg-bg px-2 py-1 pt-1 pl-1 mr-10 rounded-md w-2/3 text-start text-xl min-h-10'
					ref={el => {
						editableRefs.current[index + 1] = el
						editableRef.current = el
					}}
					onInput={e => {
						handleTextChange(elem.id, e.currentTarget.innerHTML || 'New Text')
						handleCheckIsEmpty(e)
					}}
					onPaste={handlePaste}
				></div>
			)
		case 'h4':
			return (
				<div
					role='textbox'
					aria-multiline='true'
					contentEditable={true}
					suppressContentEditableWarning={true}
					className='no-outline transition-all duration-200 focus:shadow dark:shadow-none bg-bg editable placeholder dark:focus:bg-bg px-2 py-1 pt-1 pl-1 mr-10 rounded-md w-2/3 text-start text-lg min-h-8'
					ref={el => {
						editableRefs.current[index + 1] = el
						editableRef.current = el
					}}
					onInput={e => {
						handleTextChange(elem.id, e.currentTarget.innerHTML || 'New Text')
						handleCheckIsEmpty(e)
					}}
					onPaste={handlePaste}
				></div>
			)
		case 'h5':
			return (
				<div
					role='textbox'
					aria-multiline='true'
					contentEditable={true}
					suppressContentEditableWarning={true}
					className='no-outline transition-all duration-200 focus:shadow dark:shadow-none bg-bg editable placeholder dark:focus:bg-bg px-2 py-1 pt-1 pl-1 mr-10 rounded-md w-2/3 text-start text-base min-h-8'
					ref={el => {
						editableRefs.current[index + 1] = el
						editableRef.current = el
					}}
					onInput={e => {
						handleTextChange(elem.id, e.currentTarget.innerHTML || 'New Text')
						handleCheckIsEmpty(e)
					}}
					onPaste={handlePaste}
				></div>
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
						onInput={e => {
							handleTextChange(elem.id, e.currentTarget.innerHTML || 'New Text')
							handleCheckIsEmpty(e)
						}}
						onPaste={handlePaste}
					></div>
				</div>
			)
		case 'checks':
			return (
				<div className='flex w-2/3 mr-10'>
					<input
						type='checkbox'
						checked={elem.completed ? true : false}
						onChange={() => changeCheckBoxValue(elem.id)}
						className='mr-2'
					/>
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
						onInput={e => {
							handleTextChange(elem.id, e.currentTarget.innerHTML || 'New Text')
							handleCheckIsEmpty(e)
						}}
						onPaste={handlePaste}
					></div>
				</div>
			)
	}
}

export default BlockSpace
