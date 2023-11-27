import { FunctionComponent } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import BookCatalogItemRating from '../../../components/home/book-catalog/item/rating/BookCatalogItemRating'
import { INewBookDataProps } from '../useShoppingCart'
import styles from './ShoppingCartTable.module.scss'
import { currency } from '../../../utils/currency'

interface IShoppingCartTableProps {
	newBookData: INewBookDataProps[]
	handleChangeQuantity: (variant: string, book: INewBookDataProps) => void
}

const tableTitle = ['item', 'quantity', 'price', 'delivery']

const ShoppingCartTable: FunctionComponent<IShoppingCartTableProps> = ({
	newBookData: bookData,
	handleChangeQuantity
}) => {
	const handleSwitch = (book: INewBookDataProps, title: string) => {
		switch (title) {
			case 'item':
				return (
					<>
						<Image
							src={
								book.volumeInfo.imageLinks?.thumbnail
									? book.volumeInfo.imageLinks?.thumbnail
									: '/book3.png'
							}
							alt={book.volumeInfo.title}
							width={102}
							height={145}
						/>
						<div>
							<h3>{book.volumeInfo.title}</h3>
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
							<BookCatalogItemRating book={book} />
						</div>
					</>
				)
			case 'quantity':
				return (
					<div>
						<button
							onClick={() => handleChangeQuantity('decrement', book)}
							className={styles.minus}
						></button>
						<span>{book.quantity}</span>
						<button
							onClick={() => handleChangeQuantity('increment', book)}
							className={styles.plus}
						></button>
					</div>
				)
			case 'price':
				return book.saleInfo.retailPrice?.amount
					? currency(book.saleInfo.retailPrice.amount)
					: ''
			default:
				return 'Shipping: delivery'
		}
	}
	return (
		<div className={styles.table}>
			{tableTitle.map(title => (
				<div key={title} className={styles.column}>
					<h4>{title}</h4>
					{bookData.map((book, index) => (
						<div
							key={index}
							className={clsx(styles.row, {
								[styles[title]]: title
							})}
						>
							{handleSwitch(book, title)}
						</div>
					))}
				</div>
			))}
		</div>
	)
}

export default ShoppingCartTable
