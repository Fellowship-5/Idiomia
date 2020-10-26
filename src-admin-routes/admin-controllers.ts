import { Request, Response, NextFunction } from 'express'
import Proverb from '../models/proverb.js'
import mongoose from 'mongoose'
import { findEntryById } from '../services/user_methods.js'

const deleteProverb = async (req: Request, res: Response, next: NextFunction) => {
    const proverbId = req.params.pid;
    const proverb = await findEntryById(proverbId, 'proverb', 'could not find the proverb');

    if (proverb.contributor) {
        let proverbToDelete;
        try {
            proverbToDelete = await Proverb.findById(proverbId).populate('contributor');
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Could not find proverb in database'
            });
            return next(error);
        }

        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            await proverbToDelete.remove({ session });
            proverbToDelete.contributor.proverbs.pull(proverbToDelete);
            await proverbToDelete.contributor.save({ session });
            await session.commitTransaction();
        } catch (error) {
            res.status(500).json({
                msg: 'Could not delete proverb for user'
            });
            return next(error);
        }
    } else {
        try {
            await proverb.remove();
        } catch (error) {
            res.status(500).json({
                msg: 'Could not delete proverb'
            });
            return next(error);
        }
    }
    res.status(200).json({ deleted_proverb: proverb._id });
}

export { deleteProverb } 