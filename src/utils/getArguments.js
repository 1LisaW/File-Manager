import { access } from 'fs/promises';
import path from 'path';
import { globalVariables } from '../variables.js';

export const getArguments = async (args, validateParams = {checkFirstPath:true, checkSecondPath: true}) => {
    const paths = {
        pathToFile: '',
        pathToNewDirectory: ''
    };

    //check for quotes in string
    const argsString = args.join(" ");
    const quotesIdxArray = argsString.split('').reduce((acc, item, idx) => {
        if (item === "\"" || item === "\'") {
            acc.push(idx);
        }
        return acc;
    }, []);
    if (quotesIdxArray.length >= 4) {
        paths.pathToFile = argsString.substring(quotesIdxArray[0] + 1, quotesIdxArray[1]).trim();
        paths.pathToNewDirectory = argsString.substring(quotesIdxArray[2] + 1, quotesIdxArray[3]).trim();
        return paths;
    } else if (quotesIdxArray.length === 2) {
        if (quotesIdxArray[0] > 1) {
            paths.pathToFile = argsString.substring(0, quotesIdxArray[0]).trim();
            paths.pathToNewDirectory = argsString.substring(quotesIdxArray[0] + 1, quotesIdxArray[1]).trim();
        } else {
            paths.pathToFile = argsString.substring(quotesIdxArray[0] + 1, quotesIdxArray[1]).trim();
            paths.pathToNewDirectory = argsString.substring(quotesIdxArray[1] + 1, argsString.length).trim();
        };
        return paths;
    }

    //check for args count more then 2 if there are no quotes in args
    if (args.length > 2) {
        let counter = args.length - 1;
        let isPathsUncurrent = true;
        while (isPathsUncurrent && counter > 0) {
            const possiblePathToFile = args.slice(0, counter).join(' ').trim();
            const isAbsolutePossiblePathToFile = path.isAbsolute(possiblePathToFile);
            const convertedPossiblePathToFile = isAbsolutePossiblePathToFile ? possiblePathToFile : path.resolve(globalVariables._current_directory, possiblePathToFile);

            const possiblePathToNewDirectory = args.slice(counter).join(' ').trim();
            const isAbsolutePossiblePathToNewDirectory = path.isAbsolute(possiblePathToNewDirectory);
            const convertedPossiblePathToNewDirectory = isAbsolutePossiblePathToNewDirectory ? possiblePathToNewDirectory : path.resolve(globalVariables._current_directory, possiblePathToNewDirectory);
            try {
                if (validateParams.checkFirstPath) {
                    await access(convertedPossiblePathToFile);
                };
                if (validateParams.checkSecondPath) {
                    await access(convertedPossiblePathToNewDirectory);
                };
                isPathsUncurrent = false;
            } catch {
                counter--;
            }
        }
        paths.pathToFile = args.slice(0, counter).join(' ').trim();
        paths.pathToNewDirectory = args.slice(counter).join(' ').trim();
    } else {
        [paths.pathToFile, paths.pathToNewDirectory] = args;
    }
    return paths;
}
