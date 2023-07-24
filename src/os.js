import os from 'os'

/**
 * Prints os info in console. Stops after first wrong argument
 * @param {any} args
 */
const osInfo = async (args) => {
    if (!args.length)
        throw new Error('Invalid input') 
    args.forEach((val, ind, arr) => {
        switch (val) {
            case '--EOL':
                console.log(JSON.stringify(os.EOL))
                break
            case '--cpus':
                const cpus = os.cpus()
                console.log('CPUs info:')
                cpus.forEach((val, ind, arr) => {
                    console.log(ind, ": ", val.model, val.speed / 1000, 'ghz')
                })
                break
            case '--homedir':
                console.log(os.homedir())
                break
            case '--username':
                console.log(os.userInfo().username)
                break
            case '--architecture':
                console.log(os.arch())
                break
            default:
                throw new Error('Invalid input')
        }
    })
}

export { osInfo }