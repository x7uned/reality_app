import { fetchGetSpaces } from '@/lib/slices/space.slice'
import { useAppDispatch } from '@/lib/store'
import { IconType } from '@/types/space'
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'

export interface SpaceMini {
	id: number
	name: string
	icon: IconType
	updatedAt: Date
}

interface SpaceContextType {
	spaces: SpaceMini[]
	fetchSpacesData: () => void
}

interface SpaceProviderProps {
	children: ReactNode
}

const SpaceContext = createContext<SpaceContextType | undefined>(undefined)

export const SpaceProvider: React.FC<SpaceProviderProps> = ({ children }) => {
	const dispatch = useAppDispatch()
	const [spaces, setSpaces] = useState<SpaceMini[]>([])

	const fetchSpacesData = async () => {
		try {
			const fetch = await dispatch(fetchGetSpaces())
			if (fetch.payload.spaces) {
				setSpaces(fetch.payload.spaces || [])
			}
		} catch (error) {
			console.error('Error fetching spaces:', error)
		}
	}

	useEffect(() => {
		fetchSpacesData()
	}, [])

	return (
		<SpaceContext.Provider value={{ spaces, fetchSpacesData }}>
			{children}
		</SpaceContext.Provider>
	)
}

export const useSpaces = (): SpaceContextType => {
	const context = useContext(SpaceContext)
	if (!context) {
		throw new Error('useSpaces must be used within a SpaceProvider')
	}
	return context
}
