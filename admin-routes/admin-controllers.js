"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveProverb = exports.editProverb = exports.deleteProverb = void 0;
const proverb_js_1 = __importDefault(require("../models/proverb.js"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_methods_js_1 = require("../services/user_methods.js");
const deleteProverb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const proverbId = req.params.pid;
    const proverb = yield user_methods_js_1.findEntryById(proverbId, 'proverb', 'could not find the proverb');
    if (proverb.contributor) {
        let proverbToDelete;
        try {
            proverbToDelete = yield proverb_js_1.default.findById(proverbId).populate('contributor');
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Could not find proverb in database'
            });
            return next(error);
        }
        try {
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            yield proverbToDelete.remove({ session });
            proverbToDelete.contributor.proverbs.pull(proverbToDelete);
            yield proverbToDelete.contributor.save({ session });
            yield session.commitTransaction();
        }
        catch (error) {
            res.status(500).json({
                msg: 'Could not delete proverb for user'
            });
            return next(error);
        }
    }
    else {
        try {
            yield proverb.remove();
        }
        catch (error) {
            res.status(500).json({
                msg: 'Could not delete proverb'
            });
            return next(error);
        }
    }
    res.status(200).json({ deleted_proverb: proverb._id });
});
exports.deleteProverb = deleteProverb;
const editProverb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const proverbId = req.params.pid;
    const { proverb, translation, explanation } = req.body;
    const proverbToEdit = yield user_methods_js_1.findEntryById(proverbId, 'proverb', 'Could not find proverb in database');
    proverbToEdit.proverb = proverb;
    proverbToEdit.translation = translation;
    proverbToEdit.explanation = explanation;
    try {
        yield proverbToEdit.save();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Could not save proverb in database '
        });
        return next(error);
    }
    res.status(200).json({ edited_proverb: proverbToEdit.toObject({ getters: true }) });
});
exports.editProverb = editProverb;
const approveProverb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const proverbId = req.params.pid;
    const { approve } = req.body;
    const proverbToApprove = yield user_methods_js_1.findEntryById(proverbId, 'proverb', 'Could not find proverb in database');
    proverbToApprove.adminApproval = approve;
    try {
        yield proverbToApprove.save();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Could not save proverb in database '
        });
        return next(error);
    }
    res.status(200).json({ approved_proverb: proverbToApprove.toObject({ getters: true }) });
});
exports.approveProverb = approveProverb;
