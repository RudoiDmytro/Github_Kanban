import { useState } from 'react'
import axios from 'axios'
import { useKanbanStore } from '../store/useKanbanStore'
import type { Issue } from '../types/types'

type useIssuesProps = {
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
	setError: React.Dispatch<React.SetStateAction<string | null>>
}

const useIssues = ({ setLoading, setError }: useIssuesProps) => {
	const setRepoUrl = useKanbanStore(state => state.setRepoUrl)
	const setColumns = useKanbanStore(state => state.setColumns)
	const setStars = useKanbanStore(state => state.setStars)
	const [inputValue, setInputValue] = useState('')

	const loadIssues = async () => {
		try {
			setLoading(true)
			setError(null)

			const repoPath = inputValue.replace('https://github.com/', '')
			const [owner, repo] = repoPath.split('/')

			// Fetch issues
			const issuesResponse = await axios.get<Issue[]>(
				`https://api.github.com/repos/${owner}/${repo}/issues`
				// {
				//   headers: {
				//     Authorization: `Bearer ${import.meta.env.VITE_BEARER}`,
				//     'X-GitHub-Api-Version': '2022-11-28',
				//   },
				// }
			)

			// Fetch repo details for star count
			await axios
				.get(
					`https://api.github.com/repos/${owner}/${repo}`
					// {
					// headers: {
					// 	Authorization: `Bearer ${import.meta.env.VITE_BEARER}`,
					// 	'X-GitHub-Api-Version': '2022-11-28'
					// }
					// }
				)
				.then(response => response.data)
				.then(data =>
					setStars(
						(data.stargazers_count - (data.stargazers_count % 1000)) / 1000
					)
				)

			const issues = issuesResponse.data.filter(issue => !issue.pull_request)

			const todoIssues = issues.filter(
				issue => issue.state === 'open' && !issue.assignee
			)
			const inProgressIssues = issues.filter(
				issue => issue.state === 'open' && issue.assignee
			)
			const doneIssues = issues.filter(issue => issue.state === 'closed')

			setColumns({
				todo: todoIssues,
				inProgress: inProgressIssues,
				done: doneIssues
			})

			setRepoUrl(inputValue)
			setInputValue('')
		} catch (error: any) {
			setError(error.message || 'Failed to load issues.')
		} finally {
			setLoading(false)
		}
	}

	return { inputValue, setInputValue, loadIssues }
}

export default useIssues
