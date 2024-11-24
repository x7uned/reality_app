import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { default as axiosInstance } from '../axios'

const initialState = {
	calendar: null,
}

const spaceSlice = createSlice({
	name: 'space',
	initialState,
	reducers: {},
})

export const fetchGetCategories = createAsyncThunk(
	'calendar/fetchGetCategories',
	async () => {
		try {
			const response = await axiosInstance.get(`calendar/categories`)
			return response.data
		} catch (error) {
			console.error('Something went wrong', error)
		}
	}
)

interface fetchCreateEventProps {
	content: string
	subContent: string
	categoryId: number
	date: string
}

export const fetchCreateEvent = createAsyncThunk(
	'calendar/fetchCreateEvent',
	async (data: fetchCreateEventProps) => {
		try {
			const response = await axiosInstance.post(`calendar/event`, data)
			return response.data
		} catch (error) {
			console.error('Something went wrong', error)
		}
	}
)

export const fetchDeleteEvent = createAsyncThunk(
	'calendar/fetchDeleteEvent',
	async (id: number) => {
		try {
			const response = await axiosInstance.delete(`calendar/event?id=${id}`)
			return response.data
		} catch (error) {
			console.error('Something went wrong', error)
		}
	}
)

export const fetchGetEvents = createAsyncThunk(
	'calendar/fetchGetEvents',
	async (date: string) => {
		try {
			const response = await axiosInstance.get(`calendar/events?date=${date}`)
			return response.data
		} catch (error) {
			console.error('Something went wrong', error)
		}
	}
)

export const fetchGetCalendar = createAsyncThunk(
	'calendar/fetchGetCalendar',
	async (date: string) => {
		try {
			const response = await axiosInstance.get(`calendar/get?date=${date}`)
			return response.data
		} catch (error) {
			console.error('Something went wrong', error)
		}
	}
)

export default spaceSlice.reducer
