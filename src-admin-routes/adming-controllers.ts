import {Request, Response, NextFunction } from 'express'
import Proverb from '../models/proverb.js'

const deleteProverb = async(req: Request, res:Response, next:NextFunction )=>{
    const proverbId = req.params.pid; 
    
    let proverbToDelete; 
    try {
        proverbToDelete = await Proverb.findBId(proverbId).populate('contributor'); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
			msg: 'Could not find proverb in database'
		});
		return next(error);
    }
}