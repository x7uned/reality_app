import { fetchGetCategories } from '@/lib/slices/calendar.slice'
import { fetchGetSpaces } from '@/lib/slices/space.slice'
import { useAppDispatch } from '@/lib/store'
import { CalendarCategory } from '@/types/calendar'
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
	fetchCategoriesData: () => void
	categories: CalendarCategory[]
	refreshData: () => void
}

interface SpaceProviderProps {
	children: ReactNode
}

const DataContext = createContext<SpaceContextType | undefined>(undefined)

export const SpaceProvider: React.FC<SpaceProviderProps> = ({ children }) => {
	const dispatch = useAppDispatch()
	const [spaces, setSpaces] = useState<SpaceMini[]>([])
	const [categories, setCategories] = useState<CalendarCategory[]>([])

	const refreshData = async () => {
		await fetchSpacesData()
		await fetchCategoriesData()
	}

	const fetchCategoriesData = async () => {
		try {
			const fetch = await dispatch(fetchGetCategories())
			if (fetch.payload.categories) {
				setCategories(fetch.payload.categories || [])
			}
		} catch (error) {
			console.error('Error fetching categories:', error)
		}
	}

	const fetchSpacesData = async () => {
		try {
			console.log('fetching spaces')
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
		fetchCategoriesData()
	}, [])

	return (
		<DataContext.Provider
			value={{
				spaces,
				fetchSpacesData,
				fetchCategoriesData,
				categories,
				refreshData,
			}}
		>
			{children}
		</DataContext.Provider>
	)
}

export const useData = (): SpaceContextType => {
	const context = useContext(DataContext)
	if (!context) {
		throw new Error('useSpaces must be used within a SpaceProvider')
	}
	return context
}
