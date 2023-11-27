import { NextPage } from 'next'

import BookCatalog from '../components/home/book-catalog/BookCatalog'
import Categories from '../components/home/categories/Categories'
import Slider from '../components/ui/slider/Slider'
import Promo from '../components/home/promo/Promo'
import Layout from '../components/layout/Layout'
import styles from './Home.module.scss'

const Home: NextPage = () => {
	return (
		<Layout>
			<main>
				<div className='container'>
					<section className={styles.slider_wrapper}>
						<Slider />
						<Promo />
					</section>
				</div>
				<section className={styles.book_wrapper}>
					<div className='container'>
						<div>
							<Categories />
						</div>
						<BookCatalog />
					</div>
				</section>
			</main>
		</Layout>
	)
}

export default Home
