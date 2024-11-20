import { IconType } from '@/types/space'
import { FaSpaceAwesome } from 'react-icons/fa6'
import { IoAccessibility } from 'react-icons/io5'
import { LuFile } from 'react-icons/lu'
import { MdBolt, MdFavoriteBorder } from 'react-icons/md'

interface Props {
	icon: IconType
	active: boolean
}

const IconsComponent = ({ icon, active }: Props) => {
	switch (icon) {
		case 'default':
			return (
				<LuFile
					className={active ? 'text-second' : 'text-white'}
					size={'20px'}
				/>
			)
		case 'rocket':
			return (
				<FaSpaceAwesome
					className={active ? 'text-second' : 'text-white'}
					size={'20px'}
				/>
			)
		case 'body':
			return (
				<IoAccessibility
					className={active ? 'text-second' : 'text-white'}
					size={'20px'}
				/>
			)
		case 'bolt':
			return (
				<MdBolt
					className={active ? 'text-second' : 'text-white'}
					size={'20px'}
				/>
			)
		case 'heart':
			return (
				<MdFavoriteBorder
					className={active ? 'text-second' : 'text-white'}
					size={'20px'}
				/>
			)
		default:
			return (
				<LuFile
					className={active ? 'text-second' : 'text-white'}
					size={'20px'}
				/>
			)
	}
}

export default IconsComponent
