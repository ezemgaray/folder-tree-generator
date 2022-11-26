import { drawTreeFromJsonDir, parseDirToJson } from './utils'

export * from './command'
export * from './utils'

/**
 * Folder Tree Generator
 * @param path
 * @param options
 */
export const ftg = (path: string, options = {}) => {
	const jsonDir = parseDirToJson(path)

	if (typeof jsonDir === 'object') {
		const tree = drawTreeFromJsonDir(jsonDir)
		return tree
	}
	return jsonDir
}
