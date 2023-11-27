import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ICategoriesInitialState {
	categories: string
}

const initialState: ICategoriesInitialState = {
	categories: 'Architecture'
}

export const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		SORT_CATEGORIES: (state, { payload }: PayloadAction<string>) => {
			state.categories = payload
		}
	}
})

export const categoriesActions = { ...categoriesSlice.actions }
