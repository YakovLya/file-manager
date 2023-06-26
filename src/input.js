import { errorHandler } from "./error.js"
import { calcHash } from "./hash.js"
import { osInfo } from "./os.js"
import { up, cd, ls } from './nwd.js'
import { compress } from "./compress.js"

const inputHandler = async (line) => {
    const cmd = line.split(' ')[0]
    const args = line.split(' ').slice(1).filter(arg => arg != '')
    switch (cmd) {
        case 'os':
            osInfo(args).catch(errorHandler)
            break
        case 'hash':
            await calcHash(args).catch(errorHandler)
            break
        case 'up':
            up().catch(errorHandler)
            break
        case 'cd':
            await cd(args).catch(errorHandler)
            break
        case 'ls':
            await ls().catch(errorHandler)
            break
        case 'compress':
            await compress(args, true).catch(errorHandler)
            break
        case 'decompress':
            await compress(args, false).catch(errorHandler)
            break
        default:
            errorHandler(new Error('Invalid input'))
    }
}

export { inputHandler }