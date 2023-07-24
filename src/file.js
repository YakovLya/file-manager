import { join, dirname, basename, isAbsolute } from 'path'
import { access, readFile, writeFile, rename, createReadStream, createWriteStream, unlink } from 'fs'
import { global } from './main.js'

const cat = async (args) => {
    if (args.length != 1)
        throw new Error('Invalid input')
    const path = isAbsolute(args[0]) ? args[0] : join(global.work_path, args[0])

    await new Promise((resolve, reject) => {
        readFile(path, 'utf8', (err, data) => {
            if (err)
                reject(new Error('Operation failed'))
            else {
                console.log(data)
                resolve()
            }
        })
    })
}

const add = async (args) => {
    if (args.length != 1)
        throw new Error('Invalid input')
    const path = isAbsolute(args[0]) ? args[0] : join(global.work_path, args[0])

    await new Promise((resolve, reject) => {
        access(path, (err) => {
            if (err) {
                writeFile(path, '', (err) => {
                    if (err)
                        reject(new Error('Operation failed'))
                    else
                        resolve()
                })
            } else
                reject(new Error('Operation failed'))
        })
    })
}

const rn = async (args) => {
    if (args.length != 2)
        throw new Error('Invalid input')
    const path = isAbsolute(args[0]) ? args[0] : join(global.work_path, args[0])
    const path_renamed = join(dirname(path), args[1])
    await new Promise((resolve, reject) => {
        access(path, (err) => {
            if (err)
                reject(new Error('Operation failed'))
            else {
                access(path_renamed, (err) => {
                    if (err) {
                        rename(path, path_renamed, (err) => {
                            if (err)
                                reject(new Error('Operation failed'))
                            else
                                resolve()
                        })
                    } else
                        reject(new Error('Operation failed'))
                })
            }
        })
    })
}

const cp = async (args) => {
    if (args.length != 2)
        throw new Error('Invalid input')
    const read_path = isAbsolute(args[0]) ? args[0] : join(global.work_path, args[0])
    const write_path = join(isAbsolute(args[1]) ? args[1] : join(global.work_path, args[1]), basename(read_path))
    const read_stream = createReadStream(read_path)
    const write_stream = createWriteStream(write_path, { encoding: 'utf8' })
    await new Promise((resolve, reject) => {
        read_stream.on('error', () => {
            reject(new Error('Operation failed'))
        }).pipe(write_stream).on('error', () => {
            reject(new Error('Operation failed'))
        }).on('finish', resolve)
    })
}

const mv = async (args) => {
    if (args.length != 2)
        throw new Error('Invalid input')
    const read_path = isAbsolute(args[0]) ? args[0] : join(global.work_path, args[0])
    const write_path = join(isAbsolute(args[1]) ? args[1] : join(global.work_path, args[1]), basename(read_path))
    const read_stream = createReadStream(read_path)
    const write_stream = createWriteStream(write_path, { encoding: 'utf8' })
    await new Promise((resolve, reject) => {
        read_stream.on('error', () => {
            reject(new Error('Operation failed'))
        }).pipe(write_stream).on('error', () => {
            reject(new Error('Operation failed'))
        }).on('finish', () => {
            unlink(read_path, (err) => {
                if (err)
                    reject(new Error('Operation failed'))
                else
                    resolve()
            })
        })
    })
}

const rm = async (args) => {
    if (args.length != 1)
        throw new Error('Invalid input')
    const path = isAbsolute(args[0]) ? args[0] : join(global.work_path, args[0])
    await new Promise((resolve, reject) => {
        unlink(path, (err) => {
            if (err)
                reject(new Error('Operation failed'))
            else
                resolve()
        })
    })
}

export { cat, add, rn, cp, mv, rm }