import { RootState } from './store'

import { type IBooksDataProps } from '@/app/api/books/route'

import { type ICategoriesInitialState } from './categories/categories.slice'
import { type IUserInitialState } from './user/user.slice'

export const selectBooks = (state: RootState): IBooksDataProps[] =>
	state.books.books

export const selectShoppingCartBooks = (state: RootState): IBooksDataProps[] =>
	state.books.shoppingCartBooks

export const selectCategories = (state: RootState): ICategoriesInitialState =>
	state.categories

export const selectUser = (state: RootState): IUserInitialState => state.user

export const selectIsLoading = (state: RootState): boolean =>
	state.books.isLoading
