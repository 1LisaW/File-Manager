
import path from 'path';
import { globalVariables } from '../variables.js';

export const changeCurrentDirectoryUp = () => {
    globalVariables._current_directory = path.dirname(globalVariables._current_directory)
    return () => null;
};

