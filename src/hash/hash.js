import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import { globalVariables } from '../variables.js';

export const getHashOfFile = async (args) => {
    const pathName = args.join(' ').replace(/['"]+/g, '').trim();
    const pathToFile = path.resolve(globalVariables._current_directory, pathName);
    console.log(pathToFile);
    try {
        await fs.promises.access(pathToFile);
        const isDirectory = (await fs.promises.stat(pathToFile)).isDirectory();
        if (isDirectory) {
            throw new Error();
        };
        const readStream = fs.createReadStream(pathToFile);
        const hash = createHash('sha256');
        await new Promise(async (resolve) => {
            readStream.pipe(hash).setEncoding('hex').pipe(process.stdout);
            readStream.on('end', () => {
                process.stdout.write('\n');
                resolve()
            });
        })
        return () => null;
    } catch (err) {
        return () => 'Operation failed';
    }
}
