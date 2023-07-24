import { createBrotliCompress, createBrotliDecompress } from 'zlib'
import { join, isAbsolute } from 'path'
import { createReadStream, createWriteStream } from 'fs'
import { global } from './main.js'

const compress = async (args, is_compress) => {
    if (args.length != 2)
        throw new Error('Invalid input')
    const read_path = isAbsolute(args[0]) ? args[0] : join(global.work_path, args[0])
    const write_path = isAbsolute(args[1]) ? args[1] : join(global.work_path, args[1])
    const read_stream = createReadStream(read_path)
    const write_stream = createWriteStream(write_path, { encoding: 'utf8' })
    const brotli = is_compress ? createBrotliCompress() : createBrotliDecompress()
    await new Promise((resolve, reject) => {
        read_stream.on('error', () => {
            reject(new Error('Operation failed'))
        }).pipe(brotli).on('error', () => {
            reject(new Error('Operation failed'))
        }).pipe(write_stream).on('error', () => {
            reject(new Error('Operation failed'))
        }).on('finish', resolve)
    })
}

export { compress }