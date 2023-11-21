import { selectorFamily } from 'recoil'
import { userAtom } from './atoms'

export const authSelector = selectorFamily({
	key: 'authSelector',
	get:
		(props) =>
		({ get }) => {
			const user = get(userAtom)

			const authorized = true
			return user ? { user: user, authorized } : undefined
		},
})
