import { SpaceMini } from './header.component'

const SpacesComponent = (spaces: SpaceMini[]) => {
	return (
		<div className='flex'>
			{Array.isArray(spaces) &&
				spaces.map((space, index) => (
					<div key={index} className='flex'>
						<p>{space.name}</p>
					</div>
				))}
		</div>
	)
}

export default SpacesComponent
