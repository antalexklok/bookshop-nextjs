import { NextResponse } from 'next/server'

export interface IBooksDataProps {
	volumeInfo: {
		authors: string[]
		title: string
		description: string
		imageLinks: {
			thumbnail: string
		}
	}
	saleInfo: {
		retailPrice: {
			amount: number
		}
	}
	isShoppingCart?: boolean
}

interface IDataProps {
	items: IBooksDataProps[]
}

export const GET = async (req: Request) => {
	const url = new URL(req.url)
	const subject = url.searchParams.get('subject')
	const pageIndex = url.searchParams.get('pageIndex')
	const maxResults = url.searchParams.get('maxResults')

	if (!subject) {
		return NextResponse.json(
			{ message: 'No subject in query params' },
			{ status: 400 }
		)
	}

	try {
		const res = await fetch(
			`https://www.googleapis.com/books/v1/volumes?q=Subject:${subject}&pageIndex=${pageIndex}&maxResults=${maxResults}`,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		const { items: data } = (await res.json()) as IDataProps

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		console.log(error)
	}
}
