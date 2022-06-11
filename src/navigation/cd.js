import path from 'path';
import fs from 'fs/promises'
import { globalVariables } from '../variables.js';

export const changeCurrentDirectory = async (args) => {
    const pathName = args.join(' ').replace(/['"]+/g, '').trim();
    const isAbsoluteNewPath = path.isAbsolute(pathName);
    const newPathDirection = isAbsoluteNewPath ? pathName: path.resolve(globalVariables._current_directory, pathName);
    let result;
    try{
        await fs.access(newPathDirection);
        const isDirectory = (await fs.stat(newPathDirection)).isDirectory();
        if (!isDirectory) { 
            throw new Error();    
        };
        globalVariables._current_directory = newPathDirection;
        result = null;
    } catch (err) {
        result = 'Operation failed';
    }

    return () => result;
};
