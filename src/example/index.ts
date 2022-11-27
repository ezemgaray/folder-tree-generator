import { ftg, FtgOptions } from '../index'

const example = (() => {
	// get current path
	const path = process.cwd()

	// ftg options
	const options: FtgOptions = { sort: true }

	console.log('Tree with options:', options)
	console.log('👇')

	const tree = ftg(process.cwd(), options)
	console.log(tree)
})()
