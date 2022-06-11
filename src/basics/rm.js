import fs from 'fs';
import path from 'path';
import { globalVariables } from '../variables.js';

export const deleteFile = async (args) => {
    let pathName = args.join(' ').replace(/['"]+/g, '').trim();
    const isAbsolutePossiblePathToFile = path.isAbsolute(pathName);
    const pathToFile = isAbsolutePossiblePathToFile ? pathName : path.join(globalVariables._current_directory, pathName); 

    try {
        await fs.promises.access(pathToFile);
        const isDirectory = (await fs.promises.stat(pathToFile)).isDirectory();
        if (isDirectory) {
            throw new Error();
        };
        await fs.promises.unlink(pathToFile);
        return () => null;
    } catch (err) {
        return () => 'Operation failed';
    }
}