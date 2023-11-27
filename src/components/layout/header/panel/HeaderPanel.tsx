'use client'

import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import Auth from '@/components/ui/auth/Auth'

import { selectShoppingCartBooks, selectUser } from '@/store/useSelect'

import { useAction } from '@/hooks/useAction'

import styles from './HeaderPanel.module.scss'
import Image from 'next/image'

const profPanelItems = ['Profile', 'Log out']

const HeaderPanel: FunctionComponent = () => {
	const shoppingCartBooks = useSelector(selectShoppingCartBooks)
	const { isLogin } = useSelector(selectUser)
	const { LOGOUT } = useAction()
	const [isShowAuth, setIsShowAuth] = useState<boolean>(false)
	const authRef = useRef<HTMLDivElement | null>(null)
	const { push } = useRouter()

	useEffect(() => {
		document.addEventListener('click', e => {
			if (!authRef.current?.contains(e.target as Node)) {
				setIsShowAuth(false)
			}
		})

		return () =>
			document.removeEventListener('click', e => {
				if (!authRef.current?.contains(e.target as Node)) {
					setIsShowAuth(false)
				}
			})
	}, [])

	useEffect(() => {
		setIsShowAuth(false)
	}, [isLogin])

	return (
		<div className={styles.panel}>
			<div ref={authRef} className={styles.auth}>
				<button
					onClick={() =>
						!isShowAuth ? setIsShowAuth(true) : setIsShowAuth(false)
					}
				>
					<Image
						className='auth__img'
						src='/user.svg'
						alt='user'
						width={12}
						height={15}
					/>
				</button>
				{isShowAuth && !isLogin && <Auth title='Log in' />}
				{isLogin && isShowAuth && (
					<ul>
						{profPanelItems.map(item => (
							<li key={item}>
								<Link
									href={item.toLowerCase() === 'profile' ? '/profile' : '/'}
									onClick={() => {
										if (item.toLowerCase() === 'log out') {
											LOGOUT({ name: '', email: '' })
										}
									}}
								>
									{item}
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>

			<button onClick={() => push('/shopping-cart')}>
				<Image src='/shop-bag.svg' alt='shop-bag' width={14} height={17} />
				{shoppingCartBooks.length ? <div>{shoppingCartBooks.length}</div> : ''}
			</button>
		</div>
	)
}

export default HeaderPanel
