import { useState, useRef } from 'react'
import { Button } from '../ui/button'

interface DateFilterInputProps {
	label: string
	title: string
	onFilter: (value: string) => Promise<void>
}

export const DateFilterInput = ({
	label,
	title,
	onFilter,
}: DateFilterInputProps) => {
	const [showInput, setShowInput] = useState(false)
	const [value, setValue] = useState('')
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

	const handleChange = (newValue: string) => {
		setValue(newValue)

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}

		timeoutRef.current = setTimeout(() => {
			if (!newValue) {
				onFilter('')
				return
			}

			const [year, month, day] = newValue.split('-')
			const formattedDate = `${year}-${Number(month)}-${Number(day)}`
			onFilter(formattedDate)
		}, 300)
	}

	return (
		<div className="flex items-center gap-2">
			<Button
				variant="ghost"
				onClick={() => setShowInput(!showInput)}
				title={label}
			>
				{title}
			</Button>
			{showInput && (
				<input
					type="date"
					value={value}
					onChange={e => handleChange(e.target.value)}
					className="border-custom-black/20 rounded px-3 py-1 text-sm"
					autoFocus
				/>
			)}
		</div>
	)
}
