'use client'

import { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import SkeletonLoader from '@/components/ui/loader/SkeletonLoader'

import { getBooks } from '@/store/books/books.actions'
import {
	selectBooks,
	selectCategories,
	selectIsLoading
} from '@/store/useSelect'
import { store } from '@/store/store'

import Button from '../../ui/button/Button'
import BookCatalogItem from './item/BookCatalogItem'
import styles from './BookCatalog.module.scss'

interface IAmountBooksProps {
	pageIndex: number
	maxResults: number
}

const BookCatalog: FunctionComponent = () => {
	const { categories } = useSelector(selectCategories)
	const isLoading = useSelector(selectIsLoading)
	const books = useSelector(selectBooks)

	const limitItems = 36
	const amountNewItems = 6
	const initValueAmountBooks: IAmountBooksProps = {
		pageIndex: 0,
		maxResults: 6
	}
	const [amountBooks, setAmountBooks] =
		useState<IAmountBooksProps>(initValueAmountBooks)

	useEffect(() => {
		amountBooks.maxResults < limitItems &&
			store.dispatch(getBooks({ categories, ...amountBooks }))
	}, [categories, amountBooks])

	useEffect(() => {
		setAmountBooks(initValueAmountBooks)
	}, [categories])

	return (
		<div className={styles.book_catalog}>
			{books?.map((book, index) => (
				<Fragment key={index}>
					{isLoading &&
					index >= amountBooks.pageIndex &&
					index < amountBooks.maxResults ? (
						<div>
							<SkeletonLoader inline count={1}  height={300} />
						</div>
					) : (
						<BookCatalogItem book={book} />
					)}
				</Fragment>
			))}
			{amountBooks.maxResults < limitItems && !isLoading ? (
				<div className={styles.load_btn}>
					<Button
						onClick={() =>
							setAmountBooks(prev => ({
								pageIndex: prev.pageIndex + amountNewItems,
								maxResults: prev.maxResults + amountNewItems
							}))
						}
						disabled={isLoading ? true : false}
					>
						Load more
					</Button>
				</div>
			) : amountBooks.maxResults < limitItems && isLoading ? (
				<SkeletonLoader inline count={6} height={300} />
			) : (
				''
			)}
		</div>
	)
}

export default BookCatalog
