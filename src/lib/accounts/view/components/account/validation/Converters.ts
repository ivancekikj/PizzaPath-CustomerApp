function underscoreToCamelcase(value: string): string {
	return value
		.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase())
		.replace(/^([A-Z])/, (match, letter) => letter.toLowerCase());
}

export const Converters = {
	underscoreToCamelcase
};
