
import {
    commands
} from '../variables.js';

function isValidCollectionInputFormat(command, subcommandArray, separator) {
    const subcommandUncleared = subcommandArray[0];
    const hasSeparator = subcommandUncleared.startsWith(separator);
    const subcommand = subcommandUncleared.trim().slice(2);

    return hasSeparator && commands[command].func[subcommand];
}

function isValidCommandInputFormat(subcommandArray, countOfArgs) {
    return subcommandArray.length >= countOfArgs;
}

function getCollectionCommand(command, subcommandArray, separator) {
    if (isValidCollectionInputFormat(command, subcommandArray, separator)) {
        const subcommand = subcommandArray[0].trim().slice(2);
        return commands[command].func[subcommand];
    }
    return null;
}

function getCommand(command, subcommandArray, countOfArgs) {
    if (isValidCommandInputFormat(subcommandArray, countOfArgs)) {
        return commands[command].func(subcommandArray);
    }
    return null;
}
function convertionStringToCommand(innertext) {
    const commandArray = innertext.split(' ').map( item => item.trim());
    const [command, ...rest] = commandArray;

    if (commands[command]) {
        const [isCollection, separator, countOfArgs] = commands[command].options;
        const convertedCommand = isCollection ?
            getCollectionCommand(command, rest, separator) :
            getCommand(command, rest, countOfArgs);

        return convertedCommand;
    } else {
        return null;
    }
}

export { isValidCollectionInputFormat,
         isValidCommandInputFormat,
         getCollectionCommand,
         getCommand,
         convertionStringToCommand
        }