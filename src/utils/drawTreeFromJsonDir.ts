import { FtgOptions } from './ftg'
import { DirData } from './parseDirToJson'

const treeSymbols = {
	line: '│   ',
	contain: '├── ',
	last: '└── ',
}

/**
 *	Draw Tree from json dir
 * @param dirData
 * @param options
 * @param accumulator
 * @param level
 * @param parent
 * @returns
 */
export const drawTreeFromJsonDir = (
	dirData: DirData,
	options: FtgOptions,
	accumulator: string[] = [],
	level = 0,
	parent?: DirData
): string => {
	const { line, contain, last } = treeSymbols

	for (const key in dirData) {
		const typedKey = key as keyof DirData

		// Current
		const current = dirData[typedKey]
		const currentIsArray = Array.isArray(current)
		const currentIsFile = typeof current === 'string'
		// Level
		const isNextLevel = currentIsArray
		// File
		const lastItem = Array.isArray(dirData) && [...dirData].pop()
		const isLastFile = !currentIsArray && lastItem === current
		// Folder
		const isEmptyFolder = currentIsArray && !current.length
		const lastFolderInParent = Array.isArray(parent) && [...parent].pop()
		const isLastEmptyFolder = lastFolderInParent === dirData && isEmptyFolder

		const name = currentIsFile
			? current
			: !Array.isArray(dirData)
			? typedKey
			: null

		let levelPrefix = Array.from({ length: level }, () => line).join('')

		const delimiter =
			(isLastEmptyFolder || isLastFile) && level ? last : contain

		if (name !== null) {
			accumulator.push(`${levelPrefix}${delimiter}${name}`)
		}

		if (typeof current === 'object') {
			drawTreeFromJsonDir(
				current,
				options,
				accumulator,
				isNextLevel ? level + 1 : level,
				dirData
			)
		}
	}
	return accumulator.join('\n')
}
