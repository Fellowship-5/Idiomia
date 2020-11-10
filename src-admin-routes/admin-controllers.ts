import { Request, Response, NextFunction } from 'express'
import Proverb from '../models/proverb.js'
import User from '../models/user.js'
import { paginateArr } from '../services/paginateResponse.js'
import mongoose from 'mongoose'
import { findEntryByField, findWordInField } from '../services/user_methods.js'

const deleteProverb = async (req: Request, res: Response, next: NextFunction) => {
    const proverbId = req.params.pid;
    const proverb = await findEntryByField(Proverb, '_id', proverbId);

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

const editProverb = async (req: Request, res: Response, next: NextFunction) => {

    const proverbId = req.params.pid;
    const { proverb, translation, explanation } = req.body;

    const proverbToEdit = await findEntryByField(Proverb, '_id', proverbId);

    proverbToEdit.proverb = proverb
    proverbToEdit.translation = translation;
    proverbToEdit.explanation = explanation;

    try {
        await proverbToEdit.save();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Could not save proverb in database '
        });
        return next(error);
    }
    res.status(200).json({ edited_proverb: proverbToEdit.toObject({ getters: true }) });
}


const approveProverb = async (req: Request, res: Response, next: NextFunction) => {

    const proverbId = req.params.pid;
    const { approve } = req.body;

    const proverbToApprove = await findEntryByField(Proverb, '_id', proverbId);

    proverbToApprove.adminApproval = approve;
    try {
        await proverbToApprove.save();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Could not save proverb in database '
        });
        return next(error);
    }
    res.status(200).json({ approved_proverb: proverbToApprove.toObject({ getters: true }) });
}
const getProverbs = async (req: Request, res: Response, next: NextFunction) => {
    res.json({
        proverbs: res.paginatedResults
    })

}
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    res.json({
        users: res.paginatedResults
    })

}
const searchUsers = async (req: Request, res: Response, next: NextFunction) => {
    const usersFound = await findWordInField(User, req);

    if (!usersFound) {
        res.status(200).json({
            msg: 'No users were found'
        })
        return next()
    }

    const users = paginateArr(usersFound, req)

    res.status(200).json({ users })
}
export { deleteProverb, editProverb, approveProverb, getProverbs, getUsers, searchUsers } 