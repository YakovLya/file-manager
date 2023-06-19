import { join, isAbsolute } from 'path'
import { access } from 'fs'
import { global } from './main.js'

const up = async (args) => {
    global.work_path = join(global.work_path, '../')
}

const cd = async (args) => {
    if (args.length != 1)
        throw new Error('Invalid input')
    const path = isAbsolute(args[0]) ? args[0] : join(global.work_path, args[0])
    await new Promise((resolve, reject) => {
        access(path, err => {
            if (err)
                reject(new Error('Operation failed'))
            else
                global.work_path = path
                resolve()
        })
    })
}

export { up, cd }