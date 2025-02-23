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

type Gender = 'male' | 'female' | undefined

interface Props {
	selectedGender: Gender
	setSelectedGender: (value: Gender) => void
	setCurrentPage: (value: number) => void
}
export const GenderDropdown = ({
	selectedGender,
	setSelectedGender,
	setCurrentPage,
}: Props) => {
	const handleGenderChange = (value: Gender) => {
		setSelectedGender(value)
		setCurrentPage(1)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="px-3 py-1 text-sm hover:bg-gray-50">
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
