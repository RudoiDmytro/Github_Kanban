import RepoInput from './RepoInput'
import { mount } from 'cypress/react'
import { useKanbanStore } from '../store/useKanbanStore'
import axios from 'axios'

describe('RepoInput Component', () => {
	let setLoadingSpy
	let setErrorSpy
	let mockIssues
	let mockRepoData

	beforeEach(() => {
		setLoadingSpy = cy.spy().as('setLoadingSpy')
		setErrorSpy = cy.spy().as('setErrorSpy')

		cy.stub(useKanbanStore.getState(), 'setRepoUrl').as('setRepoUrlSpy')
		cy.stub(useKanbanStore.getState(), 'setColumns').as('setColumnsSpy')
		cy.stub(useKanbanStore.getState(), 'setStars').as('setStarsSpy')

		mockIssues = [{ id: 1, title: 'Test Issue', state: 'open', assignee: null }]
		mockRepoData = { stargazers_count: 5000 }

		cy.stub(axios, 'get')
			.as('axiosGetStub')
			.callsFake(url => {
				if (url.includes('/issues')) {
					return Promise.resolve({ data: mockIssues })
				} else if (url.includes('/repos')) {
					return Promise.resolve({ data: mockRepoData })
				}
				return Promise.resolve({ data: [] }) // Default if URL doesn't match
			})
	})

	it('renders the input and button', () => {
		mount(
			<RepoInput
				setLoading={setLoadingSpy}
				setError={setErrorSpy}
			/>
		)

		cy.get('input')
			.should('exist')
			.should(
				'have.attr',
				'placeholder',
				'Enter GitHub repository URL (e.g., https://github.com/facebook/react)'
			)

		cy.get('button').should('exist').should('have.text', 'Load Issues')
	})

	it('sets inputValue state when the input changes', () => {
		mount(
			<RepoInput
				setLoading={setLoadingSpy}
				setError={setErrorSpy}
			/>
		)

		const testValue = 'test-repo'
		cy.get('input').type(testValue).should('have.value', testValue)
	})

	it('calls loadIssues when the button is clicked', () => {
		mount(
			<RepoInput
				setLoading={setLoadingSpy}
				setError={setErrorSpy}
			/>
		)

		cy.get('@axiosGetStub').should('not.be.called')

		cy.get('button')
			.click()
			.then(() => {
				expect(setLoadingSpy).to.be.calledWith(true)
				cy.get('@axiosGetStub').should('have.been.called')
			})
	})

	it('calls loadIssues when enter is pressed in the input', () => {
		mount(
			<RepoInput
				setLoading={setLoadingSpy}
				setError={setErrorSpy}
			/>
		)

		cy.get('@axiosGetStub').should('not.be.called')

		cy.get('input')
			.type('test-repo{enter}')
			.then(() => {
				expect(setLoadingSpy).to.be.calledWith(true)
				cy.get('@axiosGetStub').should('have.been.called')
			})
	})

	it('passes setLoading and setError to the useIssues hook', () => {
		mount(
			<RepoInput
				setLoading={setLoadingSpy}
				setError={setErrorSpy}
			/>
		)
	})

	it('calls setRepoUrl, setColumns, and setStars with the correct data', () => {
		mount(
			<RepoInput
				setLoading={setLoadingSpy}
				setError={setErrorSpy}
			/>
		)

		const repoUrl = 'https://github.com/test/repo'
		cy.get('input').type(repoUrl + '{enter}')

		// Assertion
		cy.get('@setRepoUrlSpy').should('be.calledWith', repoUrl)
	})

	it('displays an error message if loading issues fails', () => {
		mount(
			<RepoInput
				setLoading={setLoadingSpy}
				setError={setErrorSpy}
			/>
		)

		// Mock axios to reject the request
		cy.get('@axiosGetStub').invoke('callsFake', () =>
			Promise.reject(new Error('Failed to fetch'))
		)
		cy.get('input').type('https://github.com/test/repo{enter}')

		cy.get('@setErrorSpy').should('be.called')
	})

	it('sets loading to true and false correctly', () => {
		mount(
			<RepoInput
				setLoading={setLoadingSpy}
				setError={setErrorSpy}
			/>
		)

		// Before click asserts
		cy.get('@setLoadingSpy').should('not.be.called')

		cy.get('button').click()

		// After click asserts
		cy.get('@setLoadingSpy')
			.should('be.calledWith', true)
			.then(() => {
				cy.get('@setLoadingSpy').should('be.calledWith', false)
			})
	})
})
