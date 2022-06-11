import { access, stat } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import {
    globalVariables
} from '../variables.js';
import {getArguments} from '../utils/getArguments.js'


export const copyFile = async (args) => {
    
    const paths = await getArguments(args);
    if(!path.isAbsolute(paths.pathToFile)){
        paths.pathToFile = path.join( globalVariables._current_directory, paths.pathToFile );
    }
    if (!path.isAbsolute(paths.pathToNewDirectory)) {
        paths.pathToNewDirectory = path.join(globalVariables._current_directory, paths.pathToNewDirectory);
    }
    // console.log('paths', paths);

    try {
        await access(paths.pathToFile);
        const isFile = (await stat(paths.pathToFile)).isFile();

        if (!isFile) {
            throw new Error();
        };
        await access(paths.pathToNewDirectory);
        const isDirectory = (await stat(paths.pathToNewDirectory)).isDirectory();
        if (!isDirectory) {
            throw new Error();
        };
        const readStream = createReadStream(paths.pathToFile);
        const writeStream = createWriteStream(path.join(paths.pathToNewDirectory, path.basename(paths.pathToFile)));

        await new Promise(async (resolve) => {
            readStream.pipe(writeStream);
            readStream.on('end', () => resolve());
        })
        return () => null;
    } catch (err) {
        return () => 'Operation failed';
    }
}