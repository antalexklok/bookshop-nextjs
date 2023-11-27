import { configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	persistStore
} from 'redux-persist'

import { persistedReducer } from './reducer'

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
