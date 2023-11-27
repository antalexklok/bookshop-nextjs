'use client'

import { FunctionComponent, useEffect } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

import { selectCategories } from '@/store/useSelect'

import { useAction } from '@/hooks/useAction'

import styles from './Categories.module.scss'

const categoriesData = [
	'Architecture',
	'Art & Fashion',
	'Biography',
	'Business',
	'Crafts & Hobbies',
	'Drama',
	'Fiction',
	'Food & Drink',
	'Health & Wellbeing',
	'History & Politics',
	'Humor',
	'Poetry',
	'Psychology',
	'Science',
	'Technology',
	'Travel & Maps'
]

const Categories: FunctionComponent = () => {
	const { categories } = useSelector(selectCategories)
	const { SORT_CATEGORIES } = useAction()

	useEffect(() => {
		SORT_CATEGORIES('Architecture')
	}, [])

	return (
		<nav className={styles.categories}>
			<ul>
				{categoriesData.map(category => (
					<li
						key={category}
						className={clsx('', {
							[styles.active]: category === categories
						})}
					>
						<a
							onClick={e => {
								e.preventDefault()
								if (category === categories) return

								SORT_CATEGORIES(category)
							}}
							href='#'
						>
							{category}
						</a>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Categories
