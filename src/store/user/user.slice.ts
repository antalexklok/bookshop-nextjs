import { createSlice } from '@reduxjs/toolkit'

export interface IUserInitialState {
	info: {
		name: string
		email: string
	}
	isLogin: boolean
}

const initialState: IUserInitialState = {
	info: { name: '', email: '' },
	isLogin: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		LOGIN: (state, { payload }) => {
			state.info = payload
			state.isLogin = true
		},
		LOGOUT: (state, { payload }) => {
			state.info = payload
			state.isLogin = false
		}
	}
})

export const userActions = { ...userSlice.actions }
