import { mount } from 'cypress/react'
import KanbanCard from '../KanbanCard'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import {
	mockIssues,
	setupAnimationErrorHandler
} from './testUtils.cy'

describe('KanbanCard Component', () => {
	beforeEach(() => {
		setupAnimationErrorHandler()
		mountTestEnvironment()

	})

	const getDraggableSelector = (issueId: number | string) =>
		`[data-rfd-draggable-id="${issueId}"]`

	const mountTestEnvironment = () => {
		mount(
			<DragDropContext onDragEnd={cy.stub()}>
				<Droppable droppableId='test-droppable'>
					{provided => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							data-testid='test-droppable'
						>
							<KanbanCard
								issue={mockIssues[0]}
								index={0}
							/>
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		)
	}

	it('renders correctly with all the expected elements', () => {

		cy.contains('Fix navigation bug').should('be.visible')

		cy.contains('dev1').should('be.visible')

		cy.contains('Comments: 3').should('be.visible')

		cy.get('img[alt="dev1"]').should('be.visible')
	})

	it('applies correct styles when dragging starts and ends', () => {
		mountTestEnvironment()

		cy.get(getDraggableSelector('1001'))
			.as('draggable')
			.should('have.css', 'background-color', 'rgb(255, 255, 255)')

		cy.get('@draggable')
			.focus()
			.trigger('keydown', { keyCode: 32 })
			.then(() => {
				cy.get('@draggable').should(
					'have.css',
					'background-color',
					'rgb(127, 255, 212)'
				)
			})

		// Complete the drag by pressing space again
		cy.get('@draggable')
			.trigger('keydown', { keyCode: 32, force: true })
			.then(() => {
				// Check styles after drag ends
				cy.get('@draggable').should(
					'have.css',
					'background-color',
					'rgb(255, 255, 255)'
				)
			})
	})

	it('has proper drag handle props', () => {

		cy.get(getDraggableSelector('1001'))
			.should('have.attr', 'data-rfd-drag-handle-draggable-id', '1001')
			.should('have.attr', 'tabindex', '0')
			.should('have.attr', 'draggable', 'false')
	})

	it('provides correct props to the inner Card component', () => {

		cy.get('.ant-card-small').should('exist')

		cy.get('.ant-typography').first().should('have.css', 'font-weight', '400')
		cy.get('.ant-typography')
			.last()
			.should('have.class', 'ant-typography-secondary')
	})
})
