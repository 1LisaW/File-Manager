import fs from 'fs/promises';
import path from 'path';
import { globalVariables } from '../variables.js';

export const addNewFile = async (args) =>{
    const pathToFile = args.join(' ').replace(/['"]+/g, '').trim();
    const absPathToFile = path.resolve(globalVariables._current_directory, pathToFile);
    try{
        const arrArgs = pathToFile.split('.');
        if (arrArgs.length === 1){
            await fs.mkdir(absPathToFile);
        }else {
            await fs.writeFile(absPathToFile,'',{flag:'wx'});
        }; 
        return () => null;
    } catch( err ) {
        return () => 'Operation failed';
    }
} 