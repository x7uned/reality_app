import { Space } from '@/app/space/[id]/page'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { default as axiosInstance } from '../axios'

const initialState = {
	user: null,
}

const spaceSlice = createSlice({
	name: 'space',
	initialState,
	reducers: {},
})

export const fetchCreateSpace = createAsyncThunk(
	'space/fetchCreateSpace',
	async () => {
		try {
			const response = await axiosInstance.post('space/create')
			return response.data
		} catch (error) {
			console.error('Something went wrong', error)
			return { notfound: false }
		}
	}
)

export const fetchSaveSpace = createAsyncThunk(
	'space/fetchSaveSpace',
	async (data: Space) => {
		try {
			const response = await axiosInstance.patch('space/update', data)
			return response.data
		} catch (error) {
			console.error('Something went wrong', error)
		}
	}
)

export const fetchGetSpaces = createAsyncThunk(
	'space/fetchGetSpaces',
	async () => {
		try {
			const response = await axiosInstance.get('space/getMy')
			return response.data
		} catch (error) {
			console.error('Something went wrong', error)
		}
	}
)

export const fetchGetSpaceById = createAsyncThunk(
	'space/fetchGetSpaceById',
	async (id: number) => {
		try {
			const response = await axiosInstance.get(`space/get?id=${id}`)
			return response.data
		} catch (error) {
			console.error('Something went wrong', error)
		}
	}
)

export default spaceSlice.reducer
