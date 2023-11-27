import { FieldsetHTMLAttributes, FunctionComponent } from 'react'

import styles from './Field.module.scss'
import clsx from 'clsx'

interface IFieldProps extends FieldsetHTMLAttributes<HTMLInputElement> {
	type: string
	value: string
	isValidate: boolean
}

const Field: FunctionComponent<IFieldProps> = ({
	type,
	name,
	value,
	placeholder,
	isValidate,
	onInput
}) => {
	return (
		<input
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onInput={onInput}
			className={clsx(styles.field, {
				[styles.validate]: isValidate
			})}
		/>
	)
}

export default Field
