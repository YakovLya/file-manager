import crypto from 'crypto'
import { readFile } from 'fs'
import { errorHandler } from './error.js'

const calcHash = async (args) => {
    if (args.length != 1)
        throw new Error('Invalid input')
    const path = args[0]
    readFile(path, 'utf8', (err, data) => {
        if (err)
            return errorHandler(new Error('Operation failed'))
        console.log(crypto.createHash('sha256').update(data).digest('hex'))
    })
}

export { calcHash }