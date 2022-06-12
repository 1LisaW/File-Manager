import path from 'path';
import { getArguments } from "../utils/getArguments.js";
import { copyFile } from "./cp.js";
import { deleteFile } from "./rm.js";

export const moveFile = async ( args ) => {
    const paths = await getArguments(args);
    const { pathToFile, pathToNewDirectory } = paths;
    
    try{
        const result = await copyFile(args);
        await deleteFile([pathToFile]);
        if (result() !== null){
            throw new Error();
        }
        return () => null;
    }catch{
        return () => 'Operation failed';
    }
}