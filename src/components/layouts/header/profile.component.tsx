import { MdLogin } from 'react-icons/md'

const ProfileComponent = () => {
	return (
		<div className='flex gap-1 h-16 w-full items-center justify-center text-center'>
			<p className='text-xl font-semibold'>Sign in</p>
			<MdLogin size={'26px'} />
		</div>
	)
}

export default ProfileComponent
