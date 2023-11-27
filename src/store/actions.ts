import { categoriesActions } from './categories/categories.slice'
import { booksActions } from './books/books.slice'
import { userActions } from './user/user.slice'

export const actions = {
	...booksActions,
	...categoriesActions,
	...userActions
}
