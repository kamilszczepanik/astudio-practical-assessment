import { useState, useEffect, useRef } from 'react'
import { Button } from '../ui/button'

interface Props {
	label: string
	title: string
	onFilter: (value: string) => Promise<void>
	placeholder: string
}

export const FilterInput = ({ label, title, onFilter, placeholder }: Props) => {
	const [showInput, setShowInput] = useState(false)
	const [value, setValue] = useState('')
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

	const handleChange = (newValue: string) => {
		setValue(newValue)

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}

		timeoutRef.current = setTimeout(() => {
			onFilter(newValue)
		}, 300)
	}

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [])

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
					type="text"
					value={value}
					onChange={e => handleChange(e.target.value)}
					placeholder={placeholder}
					className="border-custom-black/20 rounded px-3 py-1 text-sm"
					autoFocus
				/>
			)}
		</div>
	)
}
