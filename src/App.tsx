import React, { useEffect, useState } from 'react'
import './App.css'
import KanbanBoard from './components/kanban/KanbanBoard'
import Loading from './components/Loader'
import Header from './components/header/Header'

const App: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

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
			{loading && <Loading />}
			<Header
				setLoading={setLoading}
				setError={setError}
				error={error}
			/>
			<main>
				<KanbanBoard />
			</main>
		</div>
	)
}

export default App
