import { FormEvent, useMemo, useState } from 'react'
import axios from 'axios'

import { useAction } from '@/hooks/useAction'

import { IReqBodyProps } from '../../../app/api/auth/route'
import { validateAuth } from '../../../utils/validateAuth'

interface IFieldsValueProps {
	label: string
	value: string
}

export const useAuth = () => {
	const { LOGIN } = useAction()
	const [validate, setValidate] = useState<string>('')
	const [fieldsValue, setFieldsValue] = useState<IFieldsValueProps[]>([
		{ label: 'email', value: '' },
		{ label: 'password', value: '' }
	])

	const handleChangeField = (
		e: FormEvent<HTMLInputElement>,
		variant: string
	) => {
		setFieldsValue(prev => {
			return prev.map(item => {
				if (item.label === variant) {
					item = { ...item, value: (e.target as HTMLInputElement).value }
				}
				return item
			})
		})
		setValidate('')
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.target as HTMLFormElement)
		const validate = validateAuth(
			formData.get('email') as string,
			formData.get('password') as string
		)

		if (validate.error) {
			setValidate(validate.label)

			return
		}

		handleFetch({
			email: formData.get('email') as string,
			password: formData.get('password') as string
		})
	}

	const handleFetch = async (body: IReqBodyProps) => {
		try {
			const { data } = await axios.post('/api/auth', body, {
				headers: { 'Content-Type': 'application/json' }
			})
			LOGIN(data)
		} catch (error) {
			console.log(error)
		}
	}

	return useMemo(
		() => ({
			validate,
			fieldsValue,
			handleChangeField,
			handleSubmit
		}),
		[validate, fieldsValue]
	)
}
