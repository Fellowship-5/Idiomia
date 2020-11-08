
import { Request, Response, NextFunction } from 'express'
import { findEntryById } from '../services/user_methods.js'

const checkRole = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    const userId = req.userData.userId;
    const user = await findEntryById(userId, 'user', 'could not find the user')
    if (user.role === 'admin') {
        next();
    } else {
        res.status(422).json({
            msg: 'You do not have the right authentication'
        })
    }
}


export default checkRole;   