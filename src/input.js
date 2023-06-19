import { errorHandler } from "./error.js"
import { calcHash } from "./hash.js"
import { osInfo } from "./os.js"
import { join } from 'path'
import { global } from './main.js'

const inputHandler = async (line) => {
    const cmd = line.split(' ')[0]
    const args = line.split(' ').slice(1)
    switch (cmd) {
        case 'os':
            osInfo(args).catch(errorHandler)
            break
        case 'hash':
            await calcHash(args).catch(errorHandler)
            break
        case 'up':
            global.work_path = join(global.work_path, '../')
            break
        default:
            errorHandler(new Error('Invalid input'))
    }
}

export { inputHandler }