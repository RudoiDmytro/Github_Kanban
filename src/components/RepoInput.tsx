import React from 'react'
import { Input, Button } from 'antd'
import useIssues from '../hooks/useIssues'

type RepoInputProps = {
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
	setError: React.Dispatch<React.SetStateAction<string | null>>
}

const RepoInput = ({ setLoading, setError }: RepoInputProps) => {
	const { inputValue, setInputValue, loadIssues } = useIssues({
		setLoading,
		setError
	})

	return (
		<div className='repoInput'>
			<Input
				placeholder='Enter GitHub repository URL (e.g., https://github.com/facebook/react)'
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				onPressEnter={loadIssues}
			/>
			<Button
				type='default'
				onClick={loadIssues}
			>
				Load Issues
			</Button>
		</div>
	)
}

export default RepoInput
