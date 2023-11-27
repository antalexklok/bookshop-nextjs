import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'

import { actions } from '@/store/actions'

export const useAction = () => {
	const dispatch = useDispatch()

	return useMemo(() => bindActionCreators(actions, dispatch), [dispatch])
}
