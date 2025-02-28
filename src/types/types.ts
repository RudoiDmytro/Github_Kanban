export type Issue = {
	id: number
	title: string
	body: string
	number: number
	state: 'open' | 'closed'
	user: {
		login: string
		avatar_url: string
	}
	assignee: {
		login: string
		avatar_url: string
	} | null
	url: string
	pull_request: {
		url: string | null
	}
	comments: number
}

export type ColumnType = 'todo' | 'inProgress' | 'done'

export type Columns = {
	[key in ColumnType]: Issue[]
}

export type KanbanState = {
	repoUrl: string
	stars: number | null
	columns: Columns
	setRepoUrl: (url: string) => void
	setStars: (stars: number) => void
	moveIssue: (
		issueId: number,
		source: ColumnType,
		destination: ColumnType,
		newIndex: number
	) => void
	setColumns: (columns: {
		todo: Issue[]
		inProgress: Issue[]
		done: Issue[]
	}) => void
	reorderIssue: (
		source: ColumnType,
		destination: ColumnType,
		sourceIndex: number,
		destinationIndex: number
	) => void
}
