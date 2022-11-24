import { program } from 'commander'
const myPackage = require('../package.json')

program.version(myPackage.version).parse()
