import { useState } from 'react'
import { Button } from './ui/button'

interface Props {
	searchQuery: string
	setSearchQuery: (query: string) => void
}

export const SearchInput = ({ searchQuery, setSearchQuery }: Props) => {
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
					placeholder="Search current page..."
					className="rounded border px-3 py-1 text-sm"
					autoFocus
				/>
			)}
		</div>
	)
}
