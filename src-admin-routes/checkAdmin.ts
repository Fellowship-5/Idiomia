
import { Request, Response, NextFunction } from 'express'
import { findEntryByField } from '../services/user_methods.js'
import User from '../models/user.js'

const checkRole = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    const userId = req.userData.userId;
    const user = await findEntryByField(User, '_id', userId)

    if (user.role === 'admin') {
        next();
    } else {
        res.status(422).json({
            msg: 'You do not have the right authentication'
        })
    }
}


export default checkRole;   