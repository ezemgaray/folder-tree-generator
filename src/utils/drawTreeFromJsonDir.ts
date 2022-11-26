import { DirData } from './parseDirToJson'

const treeSymbols = {
	line: '│   ',
	contain: '├── ',
	last: '└── ',
}

/**
 *
 * @param dirData
 * @param output
 * @param level
 * @returns
 */
export const drawTreeFromJsonDir = (
	dirData: DirData,
	output: string[] = [],
	level = 0
) => {
	const { line, contain, last } = treeSymbols
	const lastItem = Array.isArray(dirData) && [...dirData].pop()

	for (const key in dirData) {
		const typedKey = key as keyof DirData
		let prefix = Array.from({ length: level }, () => line).join('')

		const delimiter =
			typeof dirData[typedKey] == 'string' && lastItem === dirData[typedKey]
				? last
				: contain

		const name =
			typeof dirData[typedKey] === 'string'
				? dirData[typedKey]
				: !Array.isArray(dirData)
				? typedKey
				: null

		if (name !== null) {
			output.push(`${prefix}${delimiter}${name}`)
		}

		if (typeof dirData[typedKey] === 'object') {
			const isNextLevel =
				!Array.isArray(dirData) && Array.isArray(dirData[typedKey])
			drawTreeFromJsonDir(
				dirData[typedKey],
				output,
				isNextLevel ? level + 1 : level
			)
		}
	}
	return output.join('\n')
}
