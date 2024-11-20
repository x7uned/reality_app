import { Space } from '@/types/space'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { default as axiosInstance } from '../axios'

const initialState = {
	space: null,
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
			return null
		}
	}
)

export const fetchDeleteSpace = createAsyncThunk(
	'space/fetchDeleteSpace',
	async (id: number) => {
		try {
			const response = await axiosInstance.delete(`space/delete?id=${id}`)
			return response.data
		} catch (error) {
			console.error('Something went wrong', error)
			return null
		}
	}
)

export const fetchUploadImage = createAsyncThunk(
	'space/fetchUploadImage',
	async (file: FormData) => {
		try {
			const response = await axiosInstance.post('upload/image', file, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			return response.data // предполагаем, что сервер возвращает информацию о загруженном файле
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				return null
			}
			console.error('Something went wrong', error)
			throw error // Пробрасываем ошибку, чтобы обработать её в Redux
		}
	}
)

export const fetchSaveSpace = createAsyncThunk(
	'space/fetchSaveSpace',
	async (data: Space) => {
		try {
			const response = await axiosInstance.patch('space/update', data)
			return response.data
		} catch (error: any) {
			if (error.response.status == 401) {
				return null
			}
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
