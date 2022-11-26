import { program } from 'commander'
import * as fs from 'fs'
import { drawTreeFromJsonDir, parseDirToJson } from './utils'

const myPackage = require('../package.json')

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

program
	.version(myPackage.version)
	.option('-d, --directory [dir]', 'Directory path.', process.cwd())
	.option('-f, --folder-only', 'Draw folders only.')
	.parse(process.argv)

const options = program.opts()

try {
	fs.lstatSync(options.directory)

	const jsonDir = parseDirToJson(options.directory)

	if (typeof jsonDir === 'object') {
		const tree = drawTreeFromJsonDir(jsonDir)
	}
} catch (error) {
	if (error instanceof Error) {
		console.error(error.message)
	}
}
