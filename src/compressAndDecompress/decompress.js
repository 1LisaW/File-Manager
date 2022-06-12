import { access, stat } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { createBrotliDecompress } from "zlib";
import { globalVariables } from '../variables.js';
import {getArguments} from '../utils/getArguments.js'


export const decompressFile = async (args) => {
    
    const paths = await getArguments(args, {
        checkFirstPath: true,
        checkSecondPath: false
    });
    
    const sourceExtname = path.extname(paths.pathToFile);
    if (sourceExtname !== '.br') return () => 'Operation failed';
    if(!path.isAbsolute(paths.pathToFile)){
        paths.pathToFile = path.resolve(globalVariables._current_directory, paths.pathToFile);
    }
    if (!path.isAbsolute(paths.pathToNewDirectory)) {
        paths.pathToNewDirectory = path.resolve(globalVariables._current_directory, paths.pathToNewDirectory);
    }

    try {
        await access(paths.pathToFile);
        const isFile = (await stat(paths.pathToFile)).isFile();

        if (!isFile) {
            throw new Error();
        };

        const sourceFileName = path.basename(paths.pathToFile);
        const isDirectory = path.extname(paths.pathToNewDirectory) ? false : true;
        if (isDirectory) {
            const uncompressedFileName = sourceFileName.endsWith('.br') ? sourceFileName.substring(0, sourceFileName.length - 3) : sourceFileName;
            paths.pathToNewDirectory = path.join(paths.pathToNewDirectory, uncompressedFileName);
        }
       
        const readStream = createReadStream(paths.pathToFile);
        const writeStream = createWriteStream(paths.pathToNewDirectory);
        const brotli = createBrotliDecompress();

        await new Promise(async (resolve) => {
            readStream.pipe(brotli).pipe(writeStream);
            readStream.on('end', () => resolve());
        })
        return () => null;
    } catch (err) {
        return () => 'Operation failed';
    }
}