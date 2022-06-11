import fs from 'fs';
import path from 'path';
import { globalVariables } from '../variables.js';

export const readFileAndPrintIntoConsole = async (args) => {
    const pathName = args.join(' ').replace(/['"]+/g, '').trim();
    const pathToFile = path.resolve(globalVariables._current_directory, pathName);
    try {
        await fs.promises.access(pathToFile);
        const isDirectory = (await fs.promises.stat(pathToFile)).isDirectory();
        if (isDirectory) {
            throw new Error();
        };
        const readStream = fs.createReadStream(pathToFile);
        await new Promise(async (resolve)=>{
                 readStream.pipe(process.stdout);
                 readStream.on('end', ()=> resolve());
        })
        return () => null;
    } catch (err) {
        return () => 'Operation failed';
    }
}