import { program } from 'commander'
import * as fs from 'fs'
import { drawTreeFromJsonDir, parseDirToJson } from './utils'
const myPackage = require('../package.json')

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
