import { access, stat } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { createBrotliCompress } from "zlib";
import { globalVariables } from '../variables.js';
import {getArguments} from '../utils/getArguments.js'


export const compressFile = async (args) => {
    
    const paths = await getArguments(args, {checkFirstPath: true, checkSecondPath: false});
    
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
            const compressedFileName = `${sourceFileName}.br`;
            paths.pathToNewDirectory = path.join(paths.pathToNewDirectory, compressedFileName);
        }
        else{
            const compressedFileName = path.basename(paths.pathToNewDirectory);
            const sourceExtname = path.extname(paths.pathToFile);
            if (!sourceExtname.endsWith(`.${sourceExtname}.br`)){
                const destinationFileName = `${compressedFileName.split('.')[0]}${sourceExtname}.br`;
                paths.pathToNewDirectory = path.join(path.dirname(paths.pathToNewDirectory), `${destinationFileName}`);
                console.log(`Files extname for archive was uncorrect, it was changed on ${paths.pathToNewDirectory}`);
            }

        };
        const readStream = createReadStream(paths.pathToFile);
        const writeStream = createWriteStream(paths.pathToNewDirectory);
        const brotli = createBrotliCompress();

        await new Promise(async (resolve) => {
            readStream.pipe(brotli).pipe(writeStream);
            readStream.on('end', () => resolve());
        })
        return () => null;
    } catch (err) {
        return () => 'Operation failed';
    }
}