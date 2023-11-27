'use client'

import { FunctionComponent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'

import { IBooksDataProps } from '@/app/api/books/route'

import { selectShoppingCartBooks, selectUser } from '@/store/useSelect'

import { useAction } from '@/hooks/useAction'

import BookCatalogItemRating from './rating/BookCatalogItemRating'
import { currency } from '../../../../utils/currency'
import styles from './BookCatalogItem.module.scss'
import Button from '../../../ui/button/Button'

const BookCatalogItem: FunctionComponent<{
	book: IBooksDataProps
}> = ({ book }) => {
	const shoppingCartBooks = useSelector(selectShoppingCartBooks)
	const { isLogin } = useSelector(selectUser)
	const { ADD_BOOK_CART, DELETE_BOOK_CART } = useAction()
	const [isCartBook, setIsCartBook] = useState<boolean>(false)

	const handleClick = () => {
		isCartBook
			? (DELETE_BOOK_CART(book), setIsCartBook(false))
			: (ADD_BOOK_CART(book), setIsCartBook(true))
	}

	useEffect(() => {
		if (
			shoppingCartBooks.filter(
				cartBook =>
					cartBook.volumeInfo.title === book.volumeInfo.title &&
					cartBook.volumeInfo.authors[0] === book.volumeInfo.authors[0]
			).length
		) {
			setIsCartBook(true)
		}
	}, [])

	return (
		<div className={styles.book_item}>
			<Image
				src={
					book.volumeInfo.imageLinks?.thumbnail
						? book.volumeInfo.imageLinks?.thumbnail
						: '/book3.png'
				}
				alt={book.volumeInfo.title}
				width={212}
				height={300}
			/>
			<div>
				{book.volumeInfo.authors?.length ? (
					<h4>
						{book.volumeInfo.authors.map((author, index) =>
							index === book.volumeInfo.authors.length - 1
								? author
								: `${author}, `
						)}
					</h4>
				) : (
					''
				)}
				<h3>{book.volumeInfo.title}</h3>
				<BookCatalogItemRating book={book} />
				<p>{book.volumeInfo.description}</p>
				{book.saleInfo.retailPrice?.amount ? (
					<div className={styles.price}>
						{currency(book.saleInfo.retailPrice.amount)}
					</div>
				) : (
					''
				)}
				<Button
					disabled={isLogin ? false : true}
					variant={isCartBook ? 'cart' : ''}
					onClick={handleClick}
				>
					{isCartBook ? 'in the cart' : 'buy now'}
				</Button>
			</div>
		</div>
	)
}

export default BookCatalogItem
