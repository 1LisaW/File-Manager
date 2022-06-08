import osInfo from './OSinfo.js';
import {changeCurrentDirectoryUp} from './navigation/up.js'
import {changeCurrentDirectory} from './navigation/cd.js';
import { getFilesListFromCurrentFolder } from './navigation/ls.js';

const globalVariables = {
    _current_directory:'',
    _USER_NAME:''

}

// 'options': [true, '--', 0], // isCollection , separator, count of arguments
const commands = {
    'os': {func: osInfo, options:[true, '--', 0]},
    'up': {func: changeCurrentDirectoryUp, options: [false, '', 0]},
    'cd': {func: changeCurrentDirectory, options: [false, '', 1]},
    'ls': {func: getFilesListFromCurrentFolder, options:[false, '', 0]}
}

export {
    commands,
    globalVariables
}