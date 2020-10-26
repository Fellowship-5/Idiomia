
import {Request, Response, NextFunction } from 'express'
import { findEntryById} from '../services/user_methods.js'

const checkRole = async(req: Request, res:Response, next:NextFunction )=>{
    const userId = req.userData.userId; 
    const user = await findEntryById(userId); 
    console.log(user);
}


export default checkRole; 