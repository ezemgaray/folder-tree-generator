import * as fs from 'fs'
import * as path from 'path'
import { sortFolder } from './sortFolder'

export type DirData = Record<string, any> | Array<string | Record<string, any>>

/**
 * Parse directory to json from path
 * @param dirPath
 * @returns
 */
export const parseDirToJson = (
	dirPath: string
): DirData | string | undefined => {
	const baseName = path.basename(dirPath)

	if (!fs.lstatSync(dirPath).isDirectory()) {
		return baseName
	}

	const dirArrayString = fs.readdirSync(dirPath)

	const defaultIgnore = ['.vscode', '.DS_Store', '.git', 'node_modules', 'dist']

	if (defaultIgnore.includes(baseName)) {
		return
	}

	const objDirectory = dirArrayString.length
		? dirArrayString.reduce((acc: Record<string, any>, curr) => {
				acc[baseName] = fs.lstatSync(`${dirPath}/${curr}`).isDirectory()
					? [...(acc[baseName] || []), parseDirToJson(`${dirPath}/${curr}`)] //if curr is directory
					: (acc[baseName] = Array<any>(...(acc[baseName] || []), curr)) //if curr is file

				return acc
		  }, {})
		: { [baseName]: [] } // if directory is empty

	objDirectory[baseName] = sortFolder(objDirectory[baseName])

	return objDirectory
}
