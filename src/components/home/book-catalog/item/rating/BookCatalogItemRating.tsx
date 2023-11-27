import { FunctionComponent } from 'react'

import { IBooksDataProps } from '@/app/api/books/route'

import styles from './BookCatalogItemRating.module.scss'

const million = 1_000_000

const BookCatalogItemRating: FunctionComponent<{ book: IBooksDataProps }> = ({
	book
}) => {
	return (
		<div className={styles.rating}>
			<div>
				{Array.from('stars').map((_, index) => (
					<svg
						key={index}
						width='12'
						height='11'
						viewBox='0 0 12 11'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z'
							fill={4 >= index + 1 ? '#F2C94C' : '#EEEDF5'}
						/>
					</svg>
				))}
			</div>
			<div>
				{/* {book.rating.amountReview > million
					? `${book.rating.amountReview / million}M`
					: book.rating.amountReview}{' '} */}
				777 review
			</div>
		</div>
	)
}

export default BookCatalogItemRating
