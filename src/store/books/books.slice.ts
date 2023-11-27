import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IBooksDataProps } from '@/app/api/books/route'

import { getBooks } from './books.actions'

interface IBooksInitialStateProps {
	books: IBooksDataProps[]
	shoppingCartBooks: IBooksDataProps[]
	isLoading: boolean
}

const initialState: IBooksInitialStateProps = {
	books: [],
	shoppingCartBooks: [],
	isLoading: false
}

export const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		ADD_BOOK_CART: (store, { payload }: PayloadAction<IBooksDataProps>) => {
			store.shoppingCartBooks.push(payload)
		},
		DELETE_BOOK_CART: (store, { payload }: PayloadAction<IBooksDataProps>) => {
			store.shoppingCartBooks = store.shoppingCartBooks.filter(
				book =>
					book.volumeInfo.authors !== payload.volumeInfo.authors &&
					book.volumeInfo.title !== payload.volumeInfo.title
			)
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getBooks.pending, state => {
				state.isLoading = true
			})
			.addCase(
				getBooks.fulfilled,
				(state, { payload }: PayloadAction<IBooksDataProps[]>) => {
					state.books = payload
					state.isLoading = false
				}
			)
	}
})

export const booksActions = { ...booksSlice.actions }
