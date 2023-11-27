import { Montserrat } from 'next/font/google'
import type { Metadata } from 'next'

import ReduxProvider from '@/store/ReduxProvider'

import '../styles/global.scss'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Book shop',
	description: 'Book shop app'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={montserrat.className}>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	)
}
