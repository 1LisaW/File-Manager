import fs from 'fs/promises';
import { globalVariables } from '../variables.js';

export const getFilesListFromCurrentFolder = async () => {
    try{
        const list = await fs.readdir(globalVariables._current_directory);
        return () => list
    }catch(err) {
        return null;
    }
}