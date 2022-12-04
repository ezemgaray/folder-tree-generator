import chalk from 'chalk'
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
	options: FtgOptions = {}
): DirData | string | undefined => {
	const defaultIgnore = [
		'.vscode',
		'.DS_Store',
		'.git',
		'node_modules',
		'dist',
		'coverage',
		'.husky',
	]

	options.ignore = [
		...defaultIgnore,
		...((options.ignore && options.ignore) || []),
	]

	const baseName = path.basename(dirPath)

	if (!fs.lstatSync(dirPath).isDirectory()) {
		return baseName
	}

	let dirArrayString = fs.readdirSync(dirPath)

	if (options.ignore?.length) {
		// Ignore files and folders
		const ignoreRegexpArray = options.ignore.map(item => {
			try {
				return new RegExp(item)
			} catch (error) {
				throw Error(` ✗ Incorrect Regexp: ${chalk.yellow(`'${item}'`)} `)
			}
		})
		dirArrayString = dirArrayString.filter(value => {
			return ignoreRegexpArray.every(regex => !regex.test(`${value}`))
		})
	}

	const objDirectory = dirArrayString.length
		? dirArrayString.reduce((acc: Record<string, any>, curr) => {
				if (fs.lstatSync(`${dirPath}/${curr}`).isDirectory()) {
					//if curr is directory
					acc[baseName] = [
						...(acc[baseName] || []),
						parseDirToJson(`${dirPath}/${curr}`, options),
					].filter(Boolean)
				} else {
					if (!options.folderOnly) {
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
		: { [baseName]: [] } // If the directory is empty

	// Sort Directory
	if (options.sort) {
		objDirectory[baseName] = sortFolder(objDirectory[baseName])
	}

	return objDirectory
}
