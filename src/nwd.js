import { join, isAbsolute } from 'path'
import { access, readdir } from 'fs'
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

const ls = async () => {
    const path = global.work_path
    await new Promise((resolve, reject) => {
        const out = []
        readdir(path, { withFileTypes: true }, (err, files) => {
            if (err)
                reject(new Error('Operation failed'))
            files.forEach((file) => {
                out.push({
                    name: file.name,
                    type: file.isDirectory() ? 'directory' : 'file',
                })
            })
            out.sort((a, b) => {
                if (a.type != b.type)
                    return (b.type == 'directory') - (a.type == 'directory')
                else 
                    return a.name.localeCompare(b.name)
            })
            console.table(out)
            resolve()
        })
    })
}

export { up, cd, ls }