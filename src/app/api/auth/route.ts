import { validateAuth } from '../../../utils/validateAuth'
import { NextResponse } from 'next/server'

export interface IReqBodyProps {
	email: string
	password: string
}

export const POST = async (req: Request) => {
	const { email, password }: IReqBodyProps = await req.json()

	const validate = validateAuth(email, password)

	if (validate.error) {
		return NextResponse.json(
			{ message: 'Email or password are incorrect' },
			{ status: 404 }
		)
	}

	return NextResponse.json({ name: 'John Smith', email }, { status: 200 })
}
