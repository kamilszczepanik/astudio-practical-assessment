import { useState } from 'react'
import { Button } from './ui/button'

interface Props {
	searchQuery: string
	setSearchQuery: (query: string) => void
	placeholder?: string
}

export const SearchCurrentPageInput = ({
	searchQuery,
	setSearchQuery,
	placeholder = 'Search current page...',
}: Props) => {
	const [showSearch, setShowSearch] = useState(false)

	return (
		<div className="flex items-center gap-2">
			<Button
				variant="ghost"
				size="icon"
				onClick={() => setShowSearch(!showSearch)}
			>
				🔍
			</Button>
			{showSearch && (
				<input
					type="text"
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					placeholder={placeholder}
					className="rounded border px-3 py-1 text-sm"
					autoFocus
				/>
			)}
		</div>
	)
}
