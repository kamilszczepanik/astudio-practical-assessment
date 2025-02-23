import { useCallback, useEffect, useState } from 'react'
import api from '../services/api'
import { User } from '../types/users'

export const useUsers = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
  const [usersCount, setUsersCount] = useState(0)

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

  return {
    loading,
    filteredUsers,
    searchQuery,
    setSearchQuery,
    itemsPerPage,
    setItemsPerPage,
    selectedGender,
    setSelectedGender,
    currentPage,
    setCurrentPage,
    usersCount,
  }
} 