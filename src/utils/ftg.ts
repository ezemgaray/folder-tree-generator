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
export const ftg = (path: string, options?: FtgOptions): string | undefined => {
	const defaultOptions = {
		folderOnly: false,
		sort: false,
	}
	const mergedOptions = { ...defaultOptions, ...options }

	try {
		const jsonDir = parseDirToJson(path, mergedOptions)

		if (typeof jsonDir === 'object') {
			const tree = drawTreeFromJsonDir(jsonDir, mergedOptions)
			return tree
		}

		return jsonDir
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message)
		}

		return
	}
}
