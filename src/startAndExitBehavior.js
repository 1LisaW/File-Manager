import { globalVariables } from './variables.js';
import os from 'os';

const comLineArgs = process.argv[2];
globalVariables._USER_NAME = comLineArgs.split('=')[1];
console.log(os.homedir())
globalVariables._current_directory = os.homedir();

process.stdout.write(`Welcome to the File Manager, ${globalVariables._USER_NAME}!\n`);

process.on('SIGINT', () => {
    process.exit();
})
process.on('exit', () => {
    process.stdout.write(`Thank you for using File Manager, ${globalVariables._USER_NAME}!\n`);
})
