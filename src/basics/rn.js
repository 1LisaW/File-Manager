import fs, {access} from 'fs/promises';
import path from 'path';
import {
    globalVariables
} from '../variables.js';

const getArguments = async (args) => {
    const paths = {
        pathToFile: '',
        newName: ''
    };

    //check for quotes in string
    const argsString = args.join(" ");
    const quotesIdxArray = argsString.split('').reduce((acc, item, idx) => {
        if (item === "\"" || item === "\'") {
            acc.push(idx);
        }
        return acc;
    }, []);
    if (quotesIdxArray.length === 4) {
        paths.pathToFile = argsString.substring(quotesIdxArray[0] + 1, quotesIdxArray[1]).trim();
        paths.newName = argsString.substring(quotesIdxArray[2] + 1, quotesIdxArray[3]).trim();
        return paths;
    } else if (quotesIdxArray.length === 2) {
        if (quotesIdxArray[0] > 1) {
            paths.pathToFile = argsString.substring(0, quotesIdxArray[0]).trim();
            paths.newName = argsString.substring(quotesIdxArray[0] + 1, quotesIdxArray[1]).trim();
        } else {
            paths.pathToFile = argsString.substring(quotesIdxArray[0] + 1, quotesIdxArray[1]).trim();
            paths.newName = argsString.substring(quotesIdxArray[1] + 1, argsString.length).trim();
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

            try {
                await access(convertedPossiblePathToFile);
                isPathsUncurrent = false;
            } catch {
                counter--;
            }
        }
        paths.pathToFile = args.slice(0, counter).join(' ').trim();
        paths.newName = args.slice(counter).join(' ').trim();
    } else {
        [paths.pathToFile, paths.newName] = args;
    }
    return paths;
}

export const renameFile = async (args) => {
    const paths = await getArguments(args);
     if (!path.isAbsolute(paths.pathToFile)) {
         paths.pathToFile = path.resolve(globalVariables._current_directory, paths.pathToFile.trim());
     }
    console.log('pathtoFile', paths.pathToFile);
    console.log('newName ', path.join(path.dirname(paths.pathToFile), paths.newName.trim()));
    console.log(path.dirname(paths.pathToFile));
    try {
        await fs.rename(paths.pathToFile, path.join(path.dirname(paths.pathToFile), paths.newName.trim()));
        return () => null;
    } catch (err) {
        return () => 'Operation failed';
    }
}