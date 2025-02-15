describe('GitHub Kanban Board', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000')
		cy.get('input').type('https://github.com/facebook/react')
		cy.get('button').click()

		cy.contains('To Do', { timeout: 10000 }).should('be.visible')
	})

	const getDroppableSelector = (columnId: string) =>
		`[data-rfd-droppable-id="${columnId}"]`
	const getHandleSelector = () => '[data-rfd-draggable-id]'

	it('should move between lists', () => {
		cy.get(getDroppableSelector('todo'))
			.as('todo-list')
			.find(getHandleSelector())
			.first()
			.as('first-todo-item')
			.should('be.visible')

		cy.get(getDroppableSelector('inProgress'))
			.as('inProgress-list')
			.should('be.visible')

		cy.get('@first-todo-item')
			.focus()
			.trigger('keydown', { keyCode: 32 })
			.trigger('keydown', { keyCode: 39, force: true })
			.trigger('keydown', { keyCode: 32, force: true })

		cy.get('@todo-list')
			.find(getHandleSelector())
			.should('not.contain', '@first-todo-item')

		cy.get('@inProgress-list').find(getHandleSelector()).should('exist')

		cy.get(getDroppableSelector('done')).as('done-list').should('be.visible')

		cy.get('@inProgress-list')
			.find(getHandleSelector())
			.first()
			.as('first-inProgress-item')
			.focus()
			.trigger('keydown', { keyCode: 32 })
			.trigger('keydown', { keyCode: 39, force: true })
			.trigger('keydown', { keyCode: 32, force: true })

		cy.get('@inProgress-list')
			.find(getHandleSelector())
			.should('not.contain', '@first-inProgress-item')

		cy.get('@done-list').find(getHandleSelector()).should('exist')
	})
})
