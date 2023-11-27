'use client'

import { useEffect, useMemo, useState } from 'react'

import { IBooksDataProps } from '../api/books/route'

export interface INewBookDataProps extends IBooksDataProps {
	quantity: number
}

export const useShoppingCart = (bookData: IBooksDataProps[]) => {
	const [newBookData, setNewBookData] = useState<INewBookDataProps[]>(
		bookData.map(book => ({ ...book, quantity: 1 }))
	)
	const [totalPrice, setTotalPrice] = useState<number>(
		bookData.reduce((acc: number, book) => {
			return (
				acc +
				(book.saleInfo.retailPrice?.amount
					? book.saleInfo.retailPrice?.amount
					: 0)
			)
		}, 0)
	)

	const handleChangeQuantity = (variant: string, book: INewBookDataProps) => {
		if (variant === 'decrement' && book.quantity === 1) return

		setNewBookData(prev => {
			prev = prev.map(item => {
				if (
					item.volumeInfo.authors === book.volumeInfo.authors &&
					item.volumeInfo.title === book.volumeInfo.title
				) {
					variant === 'decrement'
						? (item = { ...item, quantity: item.quantity - 1 })
						: (item = { ...item, quantity: item.quantity + 1 })
				}
				return item
			})
			return prev
		})
	}

	useEffect(() => {
		setTotalPrice(
			newBookData.reduce((acc: number, book) => {
				return (
					acc +
					(book.saleInfo.retailPrice?.amount
						? book.saleInfo.retailPrice?.amount
						: 0) *
						book.quantity
				)
			}, 0)
		)
	}, [newBookData])

	return useMemo(
		() => ({ newBookData, totalPrice, handleChangeQuantity }),
		[newBookData, totalPrice]
	)
}
