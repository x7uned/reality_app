'use client'

import ImageBlock from '@/components/space/image.block'

const Home = () => {
	return (
		<div className='flex w-full justify-center items-center'>
			<p>Home Page</p>
			<ImageBlock
				elem={{
					id: 1,
					src: 'https://i.pinimg.com/564x/b0/29/45/b02945c165c73fc926915bd9e0ab8523.jpg',
					width: 300,
					height: 200,
				}}
				handleResize={(id, width, height) =>
					console.log(`Image ${id} resized to ${width}x${height}`)
				}
			/>
		</div>
	)
}

export default Home
