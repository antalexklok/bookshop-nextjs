'use client'

import { Fragment, FunctionComponent } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import clsx from 'clsx'

import styles from './Slider.module.scss'
import { useSlider } from './useSlider'

const imageData = ['/banner.png', '/banner-2.png', '/banner-3.png']
const arrowType = ['left', 'right']

const Slider: FunctionComponent = () => {
	const { activeSlideElm, handleArrowClick, handleDotsClick } =
		useSlider(imageData)

	return (
		<div className={styles.slider}>
			<div className={styles.img_wrapper}>
				{arrowType.map(arrow => (
					<div
						key={arrow}
						className={clsx(styles.arrow, {
							[styles.arrow_left]: arrow === 'left',
							[styles.arrow_right]: arrow === 'right'
						})}
						onClick={() => handleArrowClick(arrow)}
					>
						<Image src='/arrow.png' alt='arrow' width={12} height={12} />
					</div>
				))}
				{imageData.map((image, index) => (
					<Fragment key={index}>
						{index === activeSlideElm && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 1 }}
							>
								<Image
									src={image}
									alt='slider image'
									width={1120}
									height={702}
									priority={true}
								/>
							</motion.div>
						)}
					</Fragment>
				))}
			</div>
			<div className={styles.arrow_btn_wrapper}>
				{imageData.map((_, index) => (
					<button
						className={clsx('', {
							[styles.active]: index === activeSlideElm
						})}
						key={index}
						onClick={() => handleDotsClick(index)}
					></button>
				))}
			</div>
		</div>
	)
}

export default Slider
