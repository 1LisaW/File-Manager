import osInfo from './OSinfo.js';
import {changeCurrentDirectoryUp} from './navigation/up.js'
import {changeCurrentDirectory} from './navigation/cd.js';
import { getFilesListFromCurrentFolder } from './navigation/ls.js';
import { addNewFile } from './basics/add.js';
import { readFileAndPrintIntoConsole } from './basics/cat.js';
import { copyFile } from './basics/cp.js';
import { renameFile } from './basics/rn.js';
import { deleteFile } from './basics/rm.js';
import { moveFile } from './basics/mv.js';
import { getHashOfFile } from './hash/hash.js';
import { compressFile } from './compressAndDecompress/compress.js'
import { decompressFile } from './compressAndDecompress/decompress.js';

const globalVariables = {
    _current_directory:'',
    _USER_NAME:''

}

// 'options': [true, '--', 0], // isCollection , separator, count of arguments
const commands = {
    'os': { func: osInfo, options:[true, '--', 0] },
    'up': { func: changeCurrentDirectoryUp, options: [false, '', 0] },
    'cd': { func: changeCurrentDirectory, options: [false, '', 1] },
    'ls': { func: getFilesListFromCurrentFolder, options: [false, '', 0] },
    'add': { func: addNewFile, options: [false, '', 1] },
    'cat': { func: readFileAndPrintIntoConsole, options: [false, '', 1] },
    'cp': { func: copyFile, options: [false, '', 2] },
    'rn': { func: renameFile, options: [false, '', 2] },
    'rm': { func: deleteFile, options: [false, '', 1] },
    'mv': { func: moveFile, options: [false, '', 2] },
    'hash': { func: getHashOfFile, options: [false,'',1]},
    'compress': { func: compressFile, options: [false, '', 2]},
    'decompress': { func: decompressFile, options: [false, '', 2]},
}

export {
    commands,
    globalVariables
}