import type { PageLoad } from './$types'
import { redirect } from '@sveltejs/kit'
import { CustomerRepository } from '$lib/accounts/repository/CustomerRepository'

export const load: PageLoad = async ({ url }) => {
	const token: string | null = url.searchParams.get('categoryId')
	if (!token) {
		localStorage.setItem('danger', 'No token provided.')
		throw redirect(302, '/')
	}
	try {
		await CustomerRepository.validate(token)
		localStorage.setItem('success', 'Email successfully validated. You can now log in.')
	} catch (error: unknown) {
		localStorage.setItem('danger', error as string)
	}
	throw redirect(302, '/')
}
