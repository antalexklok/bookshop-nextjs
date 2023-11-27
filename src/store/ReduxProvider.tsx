'use client'

import { FunctionComponent, ReactNode } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

import { persistor, store } from './store'

const ReduxProvider: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	)
}

export default ReduxProvider
