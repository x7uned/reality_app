'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { BsMoonStars, BsSunFill } from 'react-icons/bs'
import { MdDisplaySettings } from 'react-icons/md'
const ThemeChangeComponent = () => {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<div className='flex border border-[var(--border)] w-24 rounded-md overflow-hidden h-8'>
			<div
				onClick={() => setTheme('light')}
				className={`flex hover:bg-[var(--first)] transition-colors duration-150 w-1/3 items-center justify-center ${
					theme === 'light' ? 'bg-blue-300' : 'bg-[var(--second)]'
				}`}
			>
				<BsSunFill size='16px' />
			</div>
			<div
				onClick={() => setTheme('dark')}
				className={`flex hover:bg-[var(--first)] transition-colors duration-150 w-1/3 items-center justify-center ${
					theme === 'dark' ? 'bg-blue-300' : 'bg-[var(--second)]'
				}`}
			>
				<BsMoonStars size='16px' />
			</div>
			<div
				onClick={() => setTheme('system')}
				className={`flex hover:bg-[var(--first)] transition-colors duration-150 w-1/3 items-center justify-center ${
					theme === 'system' ? 'bg-blue-300' : 'bg-[var(--second)]'
				}`}
			>
				<MdDisplaySettings size='16px' />
			</div>
		</div>
	)
}

export default ThemeChangeComponent
