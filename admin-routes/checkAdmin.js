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
const user_methods_js_1 = require("../services/user_methods.js");
const user_js_1 = __importDefault(require("../models/user.js"));
const checkRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === 'OPTIONS') {
        return next();
    }
    const userId = req.userData.userId;
    const user = yield user_methods_js_1.findEntryByField(user_js_1.default, '_id', userId);
    if (user.role === 'admin') {
        next();
    }
    else {
        res.status(422).json({
            msg: 'You do not have the right authentication'
        });
    }
});
exports.default = checkRole;
