import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	ReactNode,
} from 'react'
import { Gender, User } from '../types/users'
import api from '../services/api'

interface UserContextProps {
	loading: boolean
	users: User[]
	filteredUsers: User[]
	searchQuery: string
	itemsPerPage: number
	currentPage: number
	usersCount: number
	selectedGender: Gender
	setSearchQuery: (query: string) => void
	setItemsPerPage: (count: number) => void
	setCurrentPage: (page: number) => void
	setSelectedGender: (gender: Gender) => void
	handleEmailFilter: (email: string) => Promise<void>
	handleNameFilter: (name: string) => Promise<void>
	handleBirthDateFilter: (date: string) => Promise<void>
	handleGenderFilter: (gender: Gender) => Promise<void>
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

interface UserProviderProps {
	children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
	const [loading, setLoading] = useState(true)
	const [users, setUsers] = useState<User[]>([])
	const [filteredUsers, setFilteredUsers] = useState<User[]>([])
	const [searchQuery, setSearchQuery] = useState('')
	const [itemsPerPage, setItemsPerPage] = useState(5)
	const [currentPage, setCurrentPage] = useState(1)
	const [usersCount, setUsersCount] = useState(0)
	const [selectedGender, setSelectedGender] = useState<Gender>()

	const fetchUsers = useCallback(async () => {
		setLoading(true)
		try {
			const skip = (currentPage - 1) * itemsPerPage
			const usersInfo = await api.users({
				limit: itemsPerPage,
				skip,
			})
			setUsers(usersInfo.users)
			setUsersCount(usersInfo.total)
		} finally {
			setLoading(false)
		}
	}, [currentPage, itemsPerPage])

	const handleEmailFilter = useCallback(
		async (email: string) => {
			if (!email.trim()) {
				fetchUsers()
				return
			}

			setLoading(true)
			try {
				const response = await api.filterUsers('email', email)
				setUsers(response.users)
				setUsersCount(response.total)
			} finally {
				setLoading(false)
			}
		},
		[fetchUsers],
	)

	const handleNameFilter = useCallback(
		async (name: string) => {
			if (!name.trim()) {
				fetchUsers()
				return
			}

			setLoading(true)
			try {
				const response = await api.filterUsers('firstName', name)
				setUsers(response.users)
				setUsersCount(response.total)
			} finally {
				setLoading(false)
			}
		},
		[fetchUsers],
	)

	const handleBirthDateFilter = useCallback(
		async (date: string) => {
			if (!date) {
				fetchUsers()
				return
			}

			setLoading(true)
			try {
				const response = await api.filterUsers('birthDate', date)
				setUsers(response.users)
				setUsersCount(response.total)
			} finally {
				setLoading(false)
			}
		},
		[fetchUsers],
	)

	const handleGenderFilter = useCallback(
		async (gender: Gender) => {
			setLoading(true)
			try {
				if (!gender) {
					setSelectedGender(undefined)
					await fetchUsers()
					return
				}

				const usersInfo = await api.filterUsers('gender', gender, {
					limit: itemsPerPage,
					skip: (currentPage - 1) * itemsPerPage,
				})
				setSelectedGender(gender)
				setUsers(usersInfo.users)
				setUsersCount(usersInfo.total)
			} finally {
				setLoading(false)
			}
		},
		[currentPage, itemsPerPage, fetchUsers],
	)

	useEffect(() => {
		fetchUsers()
	}, [itemsPerPage, currentPage, fetchUsers])

	useEffect(() => {
		if (searchQuery.trim() === '') {
			setFilteredUsers(users)
			return
		}

		const query = searchQuery.toLowerCase()
		const filtered = users.filter(user =>
			Object.values(user).some(value =>
				String(value).toLowerCase().includes(query),
			),
		)
		setFilteredUsers(filtered)
	}, [searchQuery, users])

	const value = {
		loading,
		users,
		filteredUsers,
		searchQuery,
		itemsPerPage,
		currentPage,
		usersCount,
		selectedGender,
		setSearchQuery,
		setItemsPerPage,
		setCurrentPage,
		setSelectedGender,
		handleEmailFilter,
		handleNameFilter,
		handleBirthDateFilter,
		handleGenderFilter,
	}

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error('useUserContext must be used within UserProvider')
	}
	return context
}
