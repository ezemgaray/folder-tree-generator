import { ftg, FtgOptions } from '../utils'

const example = (() => {
	const options: FtgOptions = { sort: true }
	console.log('Tree options:', options)
	console.log('👇')

	console.log(ftg(process.cwd(), options))
})()
