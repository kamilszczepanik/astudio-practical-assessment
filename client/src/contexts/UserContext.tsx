import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	ReactNode,
} from 'react'
import { User } from '../types/users'
import api from '../services/api'

interface UserContextValue {
	loading: boolean
	users: User[]
	filteredUsers: User[]
	searchQuery: string
	itemsPerPage: number
	currentPage: number
	usersCount: number
	selectedGender?: 'male' | 'female'

	// Actions
	setSearchQuery: (query: string) => void
	setItemsPerPage: (count: number) => void
	setCurrentPage: (page: number) => void
	setSelectedGender: (gender?: 'male' | 'female') => void
	handleEmailFilter: (email: string) => Promise<void>
	handleNameFilter: (name: string) => Promise<void>
	handleBirthDateFilter: (date: string) => Promise<void>
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

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
	const [selectedGender, setSelectedGender] = useState<'male' | 'female'>()

	const fetchUsers = useCallback(async () => {
		setLoading(true)
		try {
			const skip = (currentPage - 1) * itemsPerPage
			const usersInfo = await api.users({
				gender: selectedGender,
				limit: itemsPerPage,
				skip,
			})
			setUsers(usersInfo.users)
			setUsersCount(usersInfo.total)
		} finally {
			setLoading(false)
		}
	}, [currentPage, itemsPerPage, selectedGender])

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

	useEffect(() => {
		fetchUsers()
	}, [selectedGender, itemsPerPage, currentPage, fetchUsers])

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