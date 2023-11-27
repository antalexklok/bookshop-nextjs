import { validEmail } from './regex'

interface IValidateAuthProps {
	error: boolean
	label: string
}

export const validateAuth = (
	email: string,
	password: string
): IValidateAuthProps => {
	if (!(validEmail.test(email) || password.length >= 6)) {
		return {
			error: true,
			label: 'all'
		}
	}

	if (!validEmail.test(email)) {
		return {
			error: true,
			label: 'email'
		}
	}

	if (password.length < 6) {
		return {
			error: true,
			label: 'password'
		}
	}

	return { error: false, label: 'all' }
}
