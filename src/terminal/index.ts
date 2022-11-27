#!/usr/bin/env node

import { program } from 'commander'
import * as fs from 'fs'
import updateNotifier from 'update-notifier'
import { drawTreeFromJsonDir, parseDirToJson } from '../utils'
const pkg = require('../../package.json')

program
	.version(pkg.version)
	.option('-d, --directory [dir]', 'Directory path.', process.cwd())
	.option('-f, --folder-only', 'Draw folders only.')
	.option(
		'-s, --sort',
		'Sort alphabetically and put folders first and then files.'
	)
	.option(
		'-c, --comments',
		'Show "Empty folder" comment (--folder-only must be false)'
	)
	.option('--emojis', 'Show emojis - folder: 📁 - File: 📄')
	.parse(process.argv)

const options = program.opts()

try {
	fs.lstatSync(options.directory)

	const jsonDir = parseDirToJson(options.directory, options)

	if (typeof jsonDir === 'object') {
		const tree = drawTreeFromJsonDir(jsonDir, options)
		console.log('--- TREE FROM TERMINAL ---')
		console.log(tree)
		console.log('--------------------------')
	}
	// Show available update
	updateNotifier({
		pkg: { name: pkg.name, version: pkg.version },
		shouldNotifyInNpmScript: true,
		updateCheckInterval: 0,
	}).notify({ isGlobal: true })
} catch (error) {
	if (error instanceof Error) {
		console.error(error.message)
	}
}
