import { errorHandler } from "./error.js"
import { osInfo } from "./os.js"

const inputHandler = async (line) => {
    const cmd = line.split(' ')[0]
    const args = line.split(' ').slice(1)
    if (cmd == 'os')
        osInfo(args).catch(errorHandler)
}

export { inputHandler }