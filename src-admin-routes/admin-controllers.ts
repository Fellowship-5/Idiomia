import { Request, Response, NextFunction } from 'express'
import Proverb from '../models/proverb.js'
import mongoose from 'mongoose'
import { findEntryById } from '../services/user_methods.js'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Could not find user in database'
        });
        return next(error);
    }

    if (!existingUser || existingUser.role !== 'admin') {
        res.status(422).json({
            msg: 'Users is not found or does not have the proper role.'
        });
        return next(new Error('Users is not found or does not have the proper role.'));
    }

    let validPassword = false;
    try {
        validPassword = await bcrypt.compare(password, existingUser.password);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'login failed. Please try again later'
        });
        return next(error);
    }

    if (!validPassword) {
        res.status(422).json({
            msg: 'Invalid credentials.'
        });
        throw new Error('Invalid credentials.');
    }

    let token;
    try {
        token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, process.env.JWT_KEY, {
            expiresIn: '1h'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'sign up failed. Please try again later'
        });
        return next(error);
    }

    res.json({
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
        token: token
    });
}


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

const editProverb = async (req: Request, res: Response, next: NextFunction) => {

    const proverbId = req.params.pid;
    const { proverb, translation, explanation } = req.body;

    const proverbToEdit = await findEntryById(proverbId, 'proverb', 'Could not find proverb in database');

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

    const proverbToApprove = await findEntryById(proverbId, 'proverb', 'Could not find proverb in database');

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


export { deleteProverb, editProverb, approveProverb, adminLogin } 