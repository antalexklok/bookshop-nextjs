'use client'

import { FunctionComponent, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import clsx from 'clsx'

import HeaderPanel from './panel/HeaderPanel'
import styles from './Header.module.scss'

const navItems = ['books', 'audiobooks', 'Stationery & gifts', 'blog']

const Header: FunctionComponent = () => {
	const pathname = usePathname()
	const { push } = useRouter()
	const [isShowNav, setIsShowNav] = useState<boolean>(false)

	const handleLinkHome = () => {
		if (pathname !== '/') {
			push('/')
		}
	}

	const handleClickBurger = () => {
		isShowNav ? setIsShowNav(false) : setIsShowNav(true)
	}

	return (
		<header className={styles.header}>
			<div className='container'>
				<div className={styles.wrapper}>
					<div className={styles.logo}>
						<button onClick={handleClickBurger}>
							<svg
								width='28'
								height='24'
								viewBox='0 0 28 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M0 2C0 0.895431 0.895431 0 2 0H26C27.1046 0 28 0.895431 28 2C28 3.10457 27.1046 4 26 4H2C0.895431 4 0 3.10457 0 2Z'
									fill='#000'
								/>
								<path
									d='M0 12C0 10.8954 0.895431 10 2 10H26C27.1046 10 28 10.8954 28 12C28 13.1046 27.1046 14 26 14H2C0.895431 14 0 13.1046 0 12Z'
									fill='#000'
								/>
								<path
									d='M0 22C0 20.8954 0.895431 20 2 20H26C27.1046 20 28 20.8954 28 22C28 23.1046 27.1046 24 26 24H2C0.895431 24 0 23.1046 0 22Z'
									fill='#000'
								/>
							</svg>
						</button>

						<h1 onClick={handleLinkHome}>Bookshop</h1>
					</div>

					<nav
						className={clsx(styles.nav, {
							[styles.show]: isShowNav
						})}
					>
						<ul>
							{navItems.map(navItem => (
								<li
									className={clsx('', {
										[styles.active]: navItem === 'books'
									})}
									key={navItem}
								>
									<a href='#'>{navItem}</a>
								</li>
							))}
						</ul>
					</nav>

					<HeaderPanel />
				</div>
			</div>
		</header>
	)
}

export default Header
