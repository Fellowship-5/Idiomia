"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkAdmin_1 = __importDefault(require("./checkAdmin"));
const router = express_1.default.Router();
router.use(checkAdmin_1.default);
// router.delete('/delete-proverb/:pid', adminControllers.deleteProverb); 
exports.default = router;
