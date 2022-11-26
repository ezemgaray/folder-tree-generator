/**
 * Sort directory recursively
 * Rules:
 *  * Folders first
 *  * In alphabetical order
 * @param arr
 * @returns
 */
export const sortFolder = (arr: Array<string | Record<string, any>>) => {
	const sorted: Array<string | Record<string, any>> = []

	// filter and sort folders by name
	arr
		.filter(item => {
			if (typeof item === 'object') {
				item[Object.keys(item)[0]] = sortFolder(item[Object.keys(item)[0]])
				return true
			}
		})
		.sort((a, b) => {
			const a1 = Object.keys(a)[0]
			const b1 = Object.keys(b)[0]
			return a1 < b1 ? -1 : a1 > b1 ? 1 : 0
		})
		.forEach(item => sorted.push(item))

	// Filter and sort files by name
	arr
		.filter(item => typeof item === 'string')
		.sort()
		.forEach(item => sorted.push(item))

	return sorted
}
