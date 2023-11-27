'use client'

import { useSelector } from 'react-redux'
import { NextPage } from 'next'

import { selectShoppingCartBooks, selectUser } from '@/store/useSelect'

import ShoppingCartTable from './table/ShoppingCartTable'
import Button from '../../components/ui/button/Button'
import { useShoppingCart } from './useShoppingCart'
import Layout from '../../components/layout/Layout'
import styles from './ShoppingCart.module.scss'
import { currency } from '../../utils/currency'

const ShoppingCart: NextPage = () => {
	const { isLogin } = useSelector(selectUser)
	const shoppingCartBooks = useSelector(selectShoppingCartBooks)
	const shoppingCartProps = useShoppingCart(shoppingCartBooks)

	return (
		<Layout>
			<main>
				<div className='container'>
					<section className={styles.shopping_cart}>
						<h1>SHOPPING CART</h1>
						<ShoppingCartTable {...shoppingCartProps} />
						<div>
							<h1>{`TOTAL PRICE: ${currency(
								shoppingCartProps.totalPrice
							)}`}</h1>
							<Button disabled={isLogin ? false : true}>CHECKOUT</Button>
						</div>
					</section>
				</div>
			</main>
		</Layout>
	)
}

export default ShoppingCart
