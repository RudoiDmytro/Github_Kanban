import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { KanbanState, ColumnType } from '../types/types'

export const useKanbanStore = create<KanbanState>()(
	persist(
		set => ({
			repoUrl: '',
			issues: [],
			stars: 0,
			columns: {
				todo: [],
				inProgress: [],
				done: []
			},
			setRepoUrl: url => set({ repoUrl: url }),
			setStars: stars => set({ stars: stars }),
			moveIssue: (
				issueId: number,
				source: ColumnType,
				destination: ColumnType,
				newIndex: number
			) => {
				set(state => {
					const issueToMove = state.columns[source].find(
						issue => issue.id === issueId
					)
					if (!issueToMove) return state

					const sourceIssues = state.columns[source].filter(
						issue => issue.id !== issueId
					)
					const destinationIssues = [...state.columns[destination]]

					destinationIssues.splice(newIndex, 0, issueToMove)

					return {
						columns: {
							...state.columns,
							[source]: sourceIssues,
							[destination]: destinationIssues
						}
					}
				})
			},

			reorderIssue: (
				source: ColumnType,
				destination: ColumnType,
				sourceIndex: number,
				destinationIndex: number
			) => {
				set(state => {
					if (source === destination) {
						const columnIssues = [...state.columns[source]]
						const [movedIssue] = columnIssues.splice(sourceIndex, 1)
						columnIssues.splice(destinationIndex, 0, movedIssue)

						return {
							columns: {
								...state.columns,
								[source]: columnIssues
							}
						}
					}
					return state
				})
			},
			setColumns: columns => set({ columns })
		}),
		{
			name: 'kanban-storage'
		}
	)
)
