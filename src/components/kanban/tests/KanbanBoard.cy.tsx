import { mount } from 'cypress/react'
import {
	mockColumns,
	setupAnimationErrorHandler
} from './testUtils.cy'
import { useKanbanStore } from '../../../store/useKanbanStore'
import 'cypress-react-selector'
import { DragDropContext } from '@hello-pangea/dnd'
import KanbanColumn from '../KanbanColumn'

describe('KanbanBoard Component', () => {
	const mountTestEnvironment = () => {
		mount(
			<main className='testingBoard'>
				<DragDropContext onDragEnd={() => {}}>
					<div
						style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}
					>
						<KanbanColumn
							columnId='todo'
							issues={mockColumns.todo}
							title='To Do'
						/>
						<KanbanColumn
							columnId='inProgress'
							issues={mockColumns.inProgress}
							title='In Progress'
						/>
						<KanbanColumn
							columnId='done'
							issues={mockColumns.done}
							title='Done'
						/>
					</div>
				</DragDropContext>
			</main>
		)
	}

	beforeEach(() => {
		setupAnimationErrorHandler()

		useKanbanStore.getState()

		useKanbanStore.setState({ columns: mockColumns })
		mountTestEnvironment()
	})

	it('renders all columns', () => {
		cy.waitForReact(5000, '.testingBoard')
		cy.contains('To Do').should('be.visible')
		cy.contains('In Progress').should('be.visible')
		cy.contains('Done').should('be.visible')

		cy.get('[data-rfd-droppable-id="todo"]')
			.find(`[data-rfd-draggable-id="${mockColumns.todo[0].id}"]`)
			.should('exist')

		cy.get('[data-rfd-droppable-id="inProgress"]')
			.find(`[data-rfd-draggable-id="${mockColumns.inProgress[0].id}"]`)
			.should('exist')

		cy.get('[data-rfd-droppable-id="done"]')
			.find('[data-rfd-draggable-id]')
			.should('not.exist')
	})

	it('dragging between columns', () => {
		cy.waitForReact(5000, '.testingBoard')

		cy.get('[data-rfd-droppable-id="todo"]')
			.find('[data-rfd-draggable-id]')
			.first()
			.as('first-todo-item')
			.should('be.visible')

		cy.get('@first-todo-item').focus().trigger('keydown', { keyCode: 32 })

		cy.get('@first-todo-item')
			.trigger('keydown', { keyCode: 39, force: true })
			.trigger('keydown', { keyCode: 32, force: true })
	})
})
