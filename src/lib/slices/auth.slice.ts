import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { default as axiosInstance } from '../axios'

const initialState = {
	user: null,
}

export interface SignUpFetch {
	email: string
	username: string
	password: string
}

const authSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload
		},
		clearUser(state) {
			state.user = null
		},
	},
})

export const fetchSignUp = createAsyncThunk(
	'user/fetchSignUp',
	async (userData: SignUpFetch) => {
		try {
			const response = await axiosInstance.post('auth/register', userData)
			return response.data
		} catch (error) {
			console.error('Something went wrong', error)
		}
	}
)

interface fetchFindUserInterface {
	id: string
}

export const fetchFindUser = createAsyncThunk(
	'user/fetchFindUser',
	async (data: fetchFindUserInterface) => {
		try {
			const response = await axiosInstance.get(`auth/find?id=${data.id}`)
			return response.data
		} catch (error) {
			console.error('Something went wrong #findUser', error)
		}
	}
)

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer
