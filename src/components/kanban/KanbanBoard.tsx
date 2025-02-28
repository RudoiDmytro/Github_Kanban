import React from 'react'
import KanbanColumn from './KanbanColumn'
import { useKanbanStore } from '../../store/useKanbanStore'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import styles from './Kanban.module.css'
import { ColumnType } from '../../types/types'

const KanbanBoard: React.FC = () => {
	const issues = useKanbanStore(state => state.columns)
	const moveIssue = useKanbanStore(state => state.moveIssue)
	const reorderIssue = useKanbanStore(state => state.reorderIssue)

	const onDragEnd = (result: DropResult) => {
		const { destination, source, draggableId } = result

		if (!destination) {
			return
		}

		const issueId = parseInt(draggableId)

		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		) {
			return
		}

		if (source.droppableId === destination.droppableId) {
			reorderIssue(
				source.droppableId as ColumnType,
				destination.droppableId as ColumnType,
				source.index,
				destination.index
			)
		} else {
			moveIssue(
				issueId,
				source.droppableId as ColumnType,
				destination.droppableId as ColumnType,
				destination.index
			)
		}
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.kanbanBoard}>
				<KanbanColumn
					columnId='todo'
					issues={issues.todo}
					title='To Do'
				/>
				<KanbanColumn
					columnId='inProgress'
					issues={issues.inProgress}
					title='In Progress'
				/>
				<KanbanColumn
					columnId='done'
					issues={issues.done}
					title='Done'
				/>
			</div>
		</DragDropContext>
	)
}

export default KanbanBoard
