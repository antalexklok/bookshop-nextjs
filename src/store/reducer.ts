import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'

import { categoriesSlice } from './categories/categories.slice'
import { booksSlice } from './books/books.slice'
import { persistConfig } from './persist.config'
import { userSlice } from './user/user.slice'

const rootReducer = combineReducers({
	categories: categoriesSlice.reducer,
	books: booksSlice.reducer,
	user: userSlice.reducer
})
export const persistedReducer = persistReducer(persistConfig, rootReducer)
