#!/usr/bin/env node

import chalk from 'chalk'
import { program } from 'commander'
import * as fs from 'fs'
import updateNotifier from 'update-notifier'
import { name, version } from '../../package.json'
import { drawTreeFromJsonDir, parseDirToJson } from '../utils'

program
	.version(version)
	.option('-d, --directory [dir]', 'Directory path', process.cwd())
	.option('-f, --folder-only', 'Draw folders only')
	.option(
		'-s, --sort',
		'Sort alphabetically and put folders first and then files'
	)
	.option(
		'-c, --comments',
		'Show "Empty folder" comment (--folder-only must be false)'
	)
	.option(
		'-e, --export [path]',
		'Set the folder path to export "ftg_tree_[date].txt" or just -e or --export for the default export to the current path'
	)
	.option(
		'-i, --ignore [regex]',
		'Regex list to ignore folders and/or files (separated by commas) - eg: "example($|/.*),index.ts"'
	)
	.option('--emojis', 'Show emojis - folder: 📁 - File: 📄')
	.parse(process.argv)

const options = program.opts()

try {
	fs.lstatSync(options.directory)

	if (options.ignore) {
		if (typeof options.ignore !== 'string') {
			throw Error(chalk.bgRed.bold('✗ Missing regex list'))
		}
		options.ignore = options.ignore.split(',').map(item => item.trim())
	}

	const jsonDir = parseDirToJson(options.directory, options)

	if (typeof jsonDir === 'object') {
		const tree = drawTreeFromJsonDir(jsonDir, options)
		console.log(chalk.green('--- TREE FROM TERMINAL ---\n'))
		console.log(tree)
		console.log(chalk.green('\n--------------------------'))

		if (options.export) {
			options.export =
				typeof options.export !== 'string' ? options.directory : options.export

			fs.writeFile(
				`${options.export}/ftg_tree_${new Date().toISOString()}.txt`,
				tree,
				error => {
					if (error) {
						throw Error
					}
					console.log(
						`\n ${chalk.green(
							'FTG Tree has been exported into'
						)} ${chalk.yellow(options.export)}`
					)
				}
			)
		}
	}
	// Show available update
	updateNotifier({
		pkg: { name, version },
		shouldNotifyInNpmScript: true,
		updateCheckInterval: 0,
	}).notify({ isGlobal: true })
} catch (error) {
	if (error instanceof Error) {
		console.log(chalk.bgRed.bold(` ${error.message} `))
	}
}
