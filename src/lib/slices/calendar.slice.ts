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
