import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface IArgsProps {
	categories: string
	pageIndex: number
	maxResults: number
}

export const getBooks = createAsyncThunk(
	'books/fetchBooks',
	async (args: IArgsProps, thunkAPI) => {
		const { categories, maxResults, pageIndex } = args

		try {
			const { data } = await axios.get(
				`/api/books?subject=${categories}&pageIndex=${pageIndex}&maxResults=${maxResults}`
			)
			return data.data
		} catch (error) {
			thunkAPI.rejectWithValue(error)
		}
	}
)
