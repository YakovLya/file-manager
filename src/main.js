import * as readline from 'node:readline/promises';
import { inputHandler } from './input.js';
import { homedir } from 'os'

const global = {
    work_path: homedir(),
}

export { global }

const getUsername = () => {
    let username = "null_name" // in case of noname testing :)
    process.argv.forEach((val, index, array) => {
        if (val.indexOf('--username') != -1)
            username = val.slice(11)
    })
    return username
}
const username = getUsername()

console.log(`Welcome to the File Manager, ${username}!`)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const exitHandler = () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`)
    rl.close()
}

rl.on('exit', exitHandler)
rl.on('SIGINT', exitHandler)

console.log(`You are currently in ${global.work_path}`)
rl.on('line', (line) => {
    if (line == '.exit')
        exitHandler()
    else
        inputHandler(line)
    console.log(`You are currently in ${global.work_path}`)
})
