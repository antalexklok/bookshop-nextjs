import { useEffect, useMemo, useState } from 'react'

export const useSlider = (imageData: string[]) => {
	const [activeSlideElm, setActiveSlideElm] = useState(0)

	const handleDotsClick = (index: number) => {
		setActiveSlideElm(index)
	}

	const handleArrowClick = (arrow: string) => {
		if (arrow === 'left') {
			activeSlideElm === 0 && arrow === 'left'
				? setActiveSlideElm(imageData.length - 1)
				: setActiveSlideElm(prev => --prev)
		}

		if (arrow === 'right') {
			activeSlideElm === imageData.length - 1 && arrow === 'right'
				? setActiveSlideElm(0)
				: setActiveSlideElm(prev => ++prev)
		}
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			activeSlideElm < imageData.length - 1
				? setActiveSlideElm(prev => ++prev)
				: setActiveSlideElm(0)
		}, 5000)

		return () => clearInterval(intervalId)
	}, [activeSlideElm])

	return useMemo(
		() => ({
			activeSlideElm,
			handleDotsClick,
			handleArrowClick
		}),
		[activeSlideElm]
	)
}
