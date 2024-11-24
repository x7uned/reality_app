import { Dispatch, SetStateAction } from 'react'

interface ModalProps {
	children: React.ReactNode
	isOpen: boolean
	onClose: Dispatch<SetStateAction<boolean>>
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
	return (
		<div
			className={`fixed inset-0 z-50 ${
				isOpen ? 'flex' : 'hidden'
			} items-center justify-center`}
		>
			<div
				className='fixed inset-0 bg-black opacity-50'
				onClick={() => onClose(false)}
			></div>
			<div className='relative bg-bg rounded-xl w-96  shadow-lg py-6 px-3'>
				{children}
			</div>
		</div>
	)
}

export default Modal
