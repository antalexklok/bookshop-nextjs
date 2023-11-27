import { ButtonHTMLAttributes, FunctionComponent } from 'react'
import clsx from 'clsx'

import styles from './Button.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: string
}

const Button: FunctionComponent<IButtonProps> = ({
	children,
	variant,
	disabled,
	onClick
}) => {
	return (
		<button
			className={clsx(styles.btn, {
				[styles.auth]: variant === 'auth',
				[styles.cart]: variant === 'cart'
			})}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default Button
