import { useUserContext } from '../../contexts/UserContext'
import { Gender } from '../../types/users'
import { DropdownMenuItem } from '../ui/dropdown-menu'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const GENDER_OPTIONS = [
	{ label: 'All', value: undefined },
	{ label: 'Male', value: 'male' as const },
	{ label: 'Female', value: 'female' as const },
] as const

export const GenderDropdown = () => {
	const { selectedGender, setSelectedGender } = useUserContext()

	const handleGenderChange = async (value: Gender) => {
		setSelectedGender(value)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="px-3 py-1 text-sm hover:bg-gray-50">
				👫
				{selectedGender
					? selectedGender.charAt(0).toUpperCase() + selectedGender.slice(1)
					: 'Gender'}
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{GENDER_OPTIONS.map(option => (
					<DropdownMenuItem
						key={option.label}
						onClick={() => handleGenderChange(option.value)}
						className="cursor-pointer"
					>
						{option.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
