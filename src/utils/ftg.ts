import { drawTreeFromJsonDir, parseDirToJson } from '.'

export interface FtgOptions {
	folderOnly?: boolean
	ignore?: string
	ignoreArray?: string[]
	sort?: boolean
}

/**
 * Folder Tree Generator
 * @param path
 * @param options
 */
export const ftg = (path: string, options?: FtgOptions) => {
	const jsonDir = parseDirToJson(path, options)

	if (typeof jsonDir === 'object') {
		const tree = drawTreeFromJsonDir(jsonDir)
		return tree
	}

	return jsonDir
}
