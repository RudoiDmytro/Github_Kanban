import { Card } from 'antd'
import type { Issue } from '../types/types'
import KanbanCard from './KanbanCard'
import { Droppable } from '@hello-pangea/dnd'

type KanbanColumnProps = {
	columnId: string
	title: string
	issues: Issue[]
}

const KanbanColumn = ({ columnId, title, issues }: KanbanColumnProps) => {
	return (
		<Card
			id={columnId}
			title={title}
			style={{ width: 300, boxSizing:'border-box' }}
		>
			<Droppable droppableId={columnId}>
				{provided => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						style={{ minHeight: '100%',height: '100%',  padding: '8px' }}
					>
						{issues.map((issue, index) => (
							<KanbanCard
								key={issue.id}
								issue={issue}
								index={index}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</Card>
	)
}

export default KanbanColumn
