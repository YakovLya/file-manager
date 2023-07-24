import { errorHandler } from "./error.js"
import { calcHash } from "./hash.js"
import { osInfo } from "./os.js"
import { up, cd, ls } from './nwd.js'
import { compress } from "./compress.js"
import { cat, add, rn, cp, mv, rm } from './file.js'

const inputHandler = async (line) => {
    const cmd = line.split(' ')[0]
    const args_raw = line.slice(line.indexOf(' '))
    let args = []
    let reg = /[^\s"'`]+|["'`]([^"'`]*)/gi
    while(true) {
        let match = reg.exec(args_raw);
        if (match != null)
            args.push(match[1] ? match[1] : match[0]);
        else
            break
    }
    args = args.filter((elem) => (elem != ' ' && elem != '"' && elem != "'" && elem != '`'))
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
        case 'cat':
            await cat(args).catch(errorHandler)
            break
        case 'add':
            await add(args).catch(errorHandler)
            break
        case 'rn':
            await rn(args).catch(errorHandler)
            break
        case 'cp':
            await cp(args).catch(errorHandler)
            break
        case 'mv':
            await mv(args).catch(errorHandler)
            break
        case 'rm':
            await rm(args).catch(errorHandler)
            break
        default:
            errorHandler(new Error('Invalid input'))
    }
}

export { inputHandler }