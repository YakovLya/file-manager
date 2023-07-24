import { createHash } from 'crypto'
import { join, isAbsolute } from 'path'
import { readFile } from 'fs'
import { global } from './main.js'


const calcHash = async (args) => {
    if (args.length != 1)
        throw new Error('Invalid input')

    const path = isAbsolute(args[0]) ? args[0] : join(global.work_path, args[0])

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