import type { PageLoad } from './$types'
import { redirect } from '@sveltejs/kit'
import { CustomerRepository } from '$lib/accounts/repository/CustomerRepository'
import { Message } from '$lib/core/domain/models'

export const load: PageLoad = async ({ url }) => {
	const token: string | null = url.searchParams.get('token')
	if (!token) {
		localStorage.setItem('message', new Message('danger', 'No token provided.').toString())
		throw redirect(302, '/')
	}
	try {
		await CustomerRepository.validate(token)
		localStorage.setItem(
			'message',
			new Message('success', 'Email successfully validated. You can now log in.').toString()
		)
	} catch (error: unknown) {
		localStorage.setItem('danger', new Message('danger', error as string).toString())
	}
	throw redirect(302, '/')
}
