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
const proverb_js_1 = __importDefault(require("../models/proverb.js"));
const deleteProverb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const proverbId = req.params.pid;
    let proverbToDelete;
    try {
        proverbToDelete = yield proverb_js_1.default.findBId(proverbId).populate('contributor');
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Could not find proverb in database'
        });
        return next(error);
    }
});
