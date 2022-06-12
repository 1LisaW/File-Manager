import './src/startAndExitBehavior.js';
import { convertionStringToCommand } from './src/utils/getCommand.js'
import { globalVariables } from './src/variables.js';

const startFileManager =  () => {
    process.stdin.on('data', async (data) => {
        if (data.toString().trim() === ".exit") {
            process.exit();
        }
        const innerText = data.toString();
        const convertedInnerStringToCommand = convertionStringToCommand(innerText);
        const result = convertedInnerStringToCommand ? (await convertedInnerStringToCommand)() : 'Invalid input'
        if (result!== null){ 
            console.log(result);
            // process.stdout.write(`${result}\n`);
        }
            process.stdout.write(`You are currently in ${globalVariables._current_directory}\n`);
    })
};
startFileManager();
