import React, { useEffect, useState } from 'react'
import './App.css'
import RepoInput from './components/RepoInput'
import KanbanBoard from './components/KanbanBoard'
import { Alert, Typography } from 'antd'
import Loading from './components/Loader'
import { useKanbanStore } from './store/useKanbanStore'
import { capitalizeFirstLetter } from './helpers/helpers'

const App: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const repoUrl = useKanbanStore(state => state.repoUrl)
	const stars = useKanbanStore(state => state.stars)

	const owner = repoUrl.replace('https://github.com/', '').split('/')[0]
	const repoName = repoUrl.replace('https://github.com/', '').split('/')[1]

	useEffect(() => {
		if (error) {
			const timer = setTimeout(() => {
				setError(null)
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [error])

	return (
		<div className='App'>
			<header className='App-header'>
				<Typography.Title>GitHub Issues Kanban Board</Typography.Title>
				<RepoInput
					setLoading={setLoading}
					setError={setError}
				/>
				{repoUrl && (
					<div className='star'>
						<a
							href={`https://github.com/${owner}`}
							target='_blank'
							rel='noopener noreferrer'
						>
							{capitalizeFirstLetter(owner)}
						</a>
						<b>&gt;</b>
						<a
							href={repoUrl}
							target='_blank'
							rel='noopener noreferrer'
						>
							{capitalizeFirstLetter(repoName)}
						</a>

						<span>
							<img
								src='https://img.icons8.com/?size=100&id=qdQpy48X3Rjv&format=png&color=000000'
								alt='star icon'
							/>
							{stars}K Stars
						</span>
					</div>
				)}

				{error && (
					<Alert
						message={error}
						type='error'
					/>
				)}
			</header>
			<main>
				<KanbanBoard />
			</main>
			{loading && <Loading />}
		</div>
	)
}

export default App
