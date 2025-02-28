import { Card, Avatar, Typography } from 'antd'
import { Issue } from '../../types/types'
import { Draggable } from '@hello-pangea/dnd'
import { animated, SpringValue, useSpring } from '@react-spring/web'
import { ReactNode } from 'react'
import styles from './Kanban.module.css'

type KanbanCardProps = {
	issue: Issue
	index: number
}

const AnimatedDiv = animated.div as React.FC<{
	children: ReactNode
	ref: (element?: HTMLElement | null | undefined) => void
	style?: {
		backgroundColor: SpringValue<string>
		boxShadow: SpringValue<string>
	}
	className?: string
}>

const KanbanCard = ({ issue, index }: KanbanCardProps) => {
	const [springProps, api] = useSpring(() => ({
		backgroundColor: 'white',
		boxShadow: 'none'
	}))

	return (
		<Draggable
			draggableId={String(issue.id)}
			index={index}
		>
			{(provided, snapshot) => {
				if (snapshot.isDragging) {
					api.start({
						backgroundColor: 'aquamarine',
						boxShadow: '4px 4px 8px aquamarine'
					})
				} else {
					api.start({
						backgroundColor: 'white',
						boxShadow: 'none'
					})
				}

				return (
					<AnimatedDiv
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className={styles.kanbanCard}
						style={{
							...provided.draggableProps.style,
							...springProps
						}}
					>
						<Card size='small'>
							<Typography.Text strong>{issue.title}</Typography.Text>
							<div>
								<Avatar
									size='small'
									src={issue.user.avatar_url}
									alt={issue.user.login}
								/>
								<Typography.Text type='secondary'>
									{issue.user.login} | Comments: {issue.comments}
								</Typography.Text>
							</div>
						</Card>
					</AnimatedDiv>
				)
			}}
		</Draggable>
	)
}

export default KanbanCard
