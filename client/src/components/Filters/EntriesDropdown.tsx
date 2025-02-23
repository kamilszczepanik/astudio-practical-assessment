import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const ENTRIES_OPTIONS = [5, 10, 20, 50]

interface Props {
	itemsPerPage: number
	setItemsPerPage: (value: number) => void
	setCurrentPage: (value: number) => void
}

export const EntriesDropdown = ({
	itemsPerPage,
	setItemsPerPage,
	setCurrentPage,
}: Props) => {
	const handleEntriesChange = (value: number) => {
		setItemsPerPage(value)
		setCurrentPage(1)
	}

	return (
		<div className="flex items-center gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger className="rounded px-3 py-1 text-sm hover:bg-gray-50">
					{itemsPerPage}
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{ENTRIES_OPTIONS.map(option => (
						<DropdownMenuItem
							key={option}
							onClick={() => handleEntriesChange(option)}
							className="cursor-pointer"
						>
							{option}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
			<span className="text-sm">Entries</span>
		</div>
	)
}
