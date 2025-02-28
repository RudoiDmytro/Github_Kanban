import { mount } from 'cypress/react'
import KanbanColumn from '../KanbanColumn'
import { DragDropContext } from '@hello-pangea/dnd'
import { mockIssues, setupAnimationErrorHandler } from './testUtils.cy'

describe('KanbanColumn Component', () => {
	beforeEach(() => {
		setupAnimationErrorHandler()
		mount(
			<DragDropContext onDragEnd={cy.stub()}>
				<KanbanColumn
					columnId='todo'
					title='To Do'
					issues={mockIssues}
				/>
			</DragDropContext>
		)
	})

	it('renders with correct title and issues', () => {
		// Check column title
		cy.contains('To Do').should('be.visible')

		// Check if all issues are rendered
		cy.contains(mockIssues[0].title).should('be.visible')
		cy.contains(mockIssues[1].title).should('be.visible')

		// Check droppable area
		cy.get('[data-rfd-droppable-id="todo"]').should('exist')

		// Check if cards are properly nested
		cy.get('[data-rfd-droppable-id="todo"]')
			.find(`[data-rfd-draggable-id="${mockIssues[0].id}"]`)
			.should('exist')

		cy.get('[data-rfd-droppable-id="todo"]')
			.find(`[data-rfd-draggable-id="${mockIssues[1].id}"]`)
			.should('exist')
	})

	it('renders with correct styling', () => {
		// Check Card styling
		cy.get('.ant-card')
			.should('have.attr', 'id', 'todo')
			.should('have.css', 'width', '300px')

		// Check droppable area styling
		cy.get('[data-rfd-droppable-id="todo"]')
			.should('have.css', 'min-height', '100%')
			.should('have.css', 'padding', '8px')
	})

	it('renders empty column correctly', () => {
		mount(
			<DragDropContext onDragEnd={cy.stub()}>
				<KanbanColumn
					columnId='done'
					title='Done'
					issues={[]}
				/>
			</DragDropContext>
		)

		// Check column title
		cy.contains('Done').should('be.visible')

		// Droppable area should exist even when empty
		cy.get('[data-rfd-droppable-id="done"]').should('exist')

		// No cards should be present
		cy.get('[data-rfd-draggable-id]').should('not.exist')
	})
})
