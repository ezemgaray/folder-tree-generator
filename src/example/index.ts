import { ftg, FtgOptions } from '../index'

const example = (() => {
	// get current path
	const path = process.cwd()

	// ftg options
	const options: FtgOptions = { sort: true, emojis: true }

	console.log('👇👇 Tree with options:', options)

	const tree = ftg(path, options)
	console.log(tree)
})()
