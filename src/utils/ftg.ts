import chalk from 'chalk'
import { drawTreeFromJsonDir, parseDirToJson } from '.'

export interface FtgOptions {
	folderOnly?: boolean
	ignore?: string[]
	sort?: boolean
	comments?: boolean
	emojis?: boolean
}

/**
 * Folder Tree Generator
 * @param path
 * @param options
 */
export const ftg = (
	path: string,
	options: FtgOptions = {}
): string | undefined => {
	try {
		const jsonDir = parseDirToJson(path, options)

		if (typeof jsonDir === 'object') {
			const tree = drawTreeFromJsonDir(jsonDir, options)
			return tree
		}

		return jsonDir
	} catch (error) {
		if (error instanceof Error) {
			console.log(chalk.bgRed.bold(` ${error.message} `))
		}

		return
	}
}
