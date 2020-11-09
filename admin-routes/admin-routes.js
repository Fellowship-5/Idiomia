"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const admin_controllers_1 = require("./admin-controllers");
const paginateResponse_1 = require("../services/paginateResponse");
const proverb_js_1 = __importDefault(require("../models/proverb.js"));
const checkAdmin_1 = __importDefault(require("./checkAdmin"));
const router = express_1.default.Router();
router.use(checkAdmin_1.default);
router.get('/all-proverbs', paginateResponse_1.paginateResponse(proverb_js_1.default), admin_controllers_1.getProverbs);
router.delete('/delete-proverb/:pid', admin_controllers_1.deleteProverb);
router.patch('/edit-proverb/:pid', admin_controllers_1.editProverb);
router.patch('/approve-proverb/:pid', admin_controllers_1.approveProverb);
module.exports = router;
