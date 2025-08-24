export interface Validator {
	validate: (value: any) => string;
}

const emailRegex: RegExp = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const phoneNumberRegex: RegExp = /^\d{3}\/\d{3}-\d{3}$/;
const usernameRegex: RegExp = /^[a-zA-Z0-9_.]{4,50}$/;
const usernameErrorMessage: string =
	'Username must be 4-50 characters and can only have letters, digits underscores and periods!';

function validatePasswordStrength(value: string): string {
	if (value.length < 8) return 'Password must have at least 8 characters!';
	if (!/\d/.test(value)) return 'Password must have at least one digit!';
	if (!/[A-Z]/.test(value)) return 'Password must have at least one uppercase letter!';
	if (!/[a-z]/.test(value)) return 'Password must have at least one lowercase letter!';
	return '';
}

export const Validators: Map<string, Validator> = new Map<string, Validator>([
	[
		'required',
		{ validate: (value) => (value == undefined || value === '' ? 'This field is required!' : '') }
	],
	['email', { validate: (value) => (emailRegex.test(value) ? '' : 'Invalid email!') }],
	['username', { validate: (value) => (usernameRegex.test(value) ? '' : usernameErrorMessage) }],
	[
		'phoneNumber',
		{
			validate: (value) =>
				phoneNumberRegex.test(value) ? '' : 'Phone number must be in format: XXX/XXX-XXX!'
		}
	],
	['password', { validate: validatePasswordStrength }]
]);
