import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import userReducer from './slices/auth.slice'

const store = configureStore({
	reducer: {
		user: userReducer,
	},
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
