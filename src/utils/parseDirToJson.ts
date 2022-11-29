import * as fs from 'fs'
import * as path from 'path'
import { FtgOptions } from './ftg'
import { sortFolder } from './sortFolder'

export type DirData = Record<string, any> | Array<string | Record<string, any>>

/**
 * Parse directory to json from path
 * @param dirPath
 * @returns
 */
export const parseDirToJson = (
	dirPath: string,
	options?: FtgOptions
): DirData | string | undefined => {
	const defaultOptions = {
		folderOnly: false,
		sort: false,
	}
	const mergedOptions = { ...defaultOptions, ...options }

	const baseName = path.basename(dirPath)

	if (!fs.lstatSync(dirPath).isDirectory()) {
		return baseName
	}

	const dirArrayString = fs.readdirSync(dirPath)

	const defaultIgnore = [
		'.vscode',
		'.DS_Store',
		'.git',
		'node_modules',
		'dist',
		'coverage',
	]

	if (defaultIgnore.includes(baseName)) {
		return
	}

	const objDirectory = dirArrayString.length
		? dirArrayString.reduce((acc: Record<string, any>, curr) => {
				if (fs.lstatSync(`${dirPath}/${curr}`).isDirectory()) {
					//if curr is directory
					acc[baseName] = [
						...(acc[baseName] || []),
						parseDirToJson(`${dirPath}/${curr}`, mergedOptions),
					].filter(Boolean)
				} else {
					if (!mergedOptions.folderOnly && !defaultIgnore.includes(curr)) {
						// If curr is a file and is not in "defaultIgnore"
						acc[baseName] = acc[baseName] = Array<any>(
							...(acc[baseName] || []),
							curr
						)
					} else {
						// If curr is a file but only folders are included
						// This way the parent folder can be empty
						acc[baseName] = acc[baseName] = Array<any>(...(acc[baseName] || []))
					}
				}

				return acc
		  }, {})
		: { [baseName]: [] } // if directory is empty

	// Sort Directory
	if (mergedOptions?.sort) {
		objDirectory[baseName] = sortFolder(objDirectory[baseName])
	}

	return objDirectory
}
