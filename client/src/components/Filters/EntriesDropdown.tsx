import { useDynamicContext } from '../../hooks/useDynamicContext'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const ENTRIES_OPTIONS = [5, 10, 20, 50]

export const EntriesDropdown = () => {
	const { itemsPerPage, setItemsPerPage, setCurrentPage } = useDynamicContext()

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
