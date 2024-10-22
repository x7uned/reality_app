import {
	MdOutlineEditCalendar,
	MdOutlineInsertDriveFile,
	MdOutlineSettings,
	MdSpaceDashboard,
} from 'react-icons/md'

const Header = () => {
	return (
		<div className='flex py-2 flex-col h-screen gap-1 items-center fixed w-36 bg-bg'>
			<div className='flex items-center cursor-pointer hover:bg-gray-100 rounded-[4px] px-2 h-12 w-5/6'>
				<MdSpaceDashboard />
				<p className='ml-2'>Dashboard</p>
			</div>
			<div className='flex items-center cursor-pointer hover:bg-gray-100 rounded-[4px] px-2 h-12 w-5/6'>
				<MdOutlineEditCalendar />
				<p className='ml-2'>Calendar</p>
			</div>
			<div className='flex items-center cursor-pointer hover:bg-gray-100 rounded-[4px] px-2 h-12 w-5/6'>
				<MdOutlineSettings />
				<p className='ml-2'>Settings</p>
			</div>
			<p className='text-subtext font-medium'>Spaces</p>
			<div className='flex items-center cursor-pointer hover:bg-gray-100 rounded-[4px] px-2 h-12 w-5/6'>
				<MdOutlineInsertDriveFile />
				<p className='ml-2'>New space</p>
			</div>
			<div className='flex items-end h-full'>
				<p>User</p>
			</div>
		</div>
	)
}

export default Header
