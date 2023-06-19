import { createHash } from 'crypto'
import { join } from 'path'
import { readFile } from 'fs'
import { errorHandler } from './error.js'
import { global } from './main.js'


const calcHash = async (args, callback) => {
    if (args.length != 1)
        throw new Error('Invalid input')
        
    const path = join(global.work_path, args[0])
    await new Promise((resolve, reject) => {
        readFile(path, 'utf8', async (err, data) => {
            if (err)
                reject(new Error('Operation failed'))
            else {
                console.log(createHash('sha256').update(data).digest('hex'))
                resolve()
            }
        })
    })
}

export { calcHash }