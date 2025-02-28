import { Issue } from '../../../types/types'
export const mockIssues: Issue[] = [
	{
		id: 1001,
		title: 'Fix navigation bug',
		user: {
			login: 'dev1',
			avatar_url:
				'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5'
		},
		comments: 3,
		body: '',
		number: 0,
		state: 'open',
		assignee: {
			login: '',
			avatar_url: ''
		},
		url: '',
		pull_request: {
			url: ''
		}
	},
	{
		id: 1002,
		title: 'Update documentation',
		user: {
			login: 'dev2',
			avatar_url:
				'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5'
		},
		comments: 5,
		body: '',
		number: 0,
		state: 'open',
		assignee: {
			login: '',
			avatar_url: ''
		},
		url: '',
		pull_request: {
			url: ''
		}
	}
]

export const mockColumns = {
	todo: [mockIssues[0]],
	inProgress: [mockIssues[1]],
	done: []
}

// Handle React Spring animation errors
export const setupAnimationErrorHandler = () => {
	cy.on('uncaught:exception', err => {
		if (
			err.message.includes('Cannot animate between') ||
			err.message.includes('AnimatedValue') ||
			err.message.includes('AnimatedString')
		) {
			return false
		}
		return true
	})
}
