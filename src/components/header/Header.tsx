import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { Alert, Typography } from 'antd'
import RepoInput from '../RepoInput'
import { useKanbanStore } from '../../store/useKanbanStore'
import { capitalizeFirstLetter } from '../../helpers/helpers'
import styles from './Header.module.css'

type HeaderProps = {
	setLoading: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string | null>>
	error: string | null
}

const Header: React.FC<HeaderProps> = ({ setLoading, setError, error }) => {
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
	}, [error, setError])

	return (
		<header className={styles.header}>
			<Typography.Title>GitHub Issues Kanban Board</Typography.Title>
			<RepoInput
				setLoading={setLoading}
				setError={setError}
			/>

			{repoUrl && (
				<div className={styles.repoInfo}>
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

					<span className={styles.star}>
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
	)
}

export default Header
