"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const admin_controllers_1 = require("./admin-controllers");
const checkAdmin_1 = __importDefault(require("./checkAdmin"));
const router = express_1.default.Router();
router.use(checkAdmin_1.default);
router.delete('/delete-proverb/:pid', admin_controllers_1.deleteProverb);
module.exports = router;
