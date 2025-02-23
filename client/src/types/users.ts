export const USER_FIELDS = [
	'firstName',
	'lastName',
	'maidenName',
	'age',
	'gender',
	'email',
	'username',
	'bloodGroup',
	'eyeColor',
	'birthDate',
	'height',
	'weight',
] as const

export type UserField = (typeof USER_FIELDS)[number]

export interface User {
	id: number
	firstName: string
	lastName: string
	maidenName: string
	age: number
	gender: string
	email: string
	username: string
	bloodGroup: string
	eyeColor: string
	birthDate: string
	height: number
	weight: number
}

export const USER_TABLE_COLUMNS = USER_FIELDS.map(field => ({
	key: field,
	label: field.replace(/([A-Z])/g, ' $1').toUpperCase(),
}))

export interface UsersResponse {
	users: User[]
	total: number
	skip: number
	limit: number
}
