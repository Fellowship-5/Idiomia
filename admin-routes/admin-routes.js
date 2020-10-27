"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const admin_controllers_1 = require("./admin-controllers");
const checkAdmin_1 = __importDefault(require("./checkAdmin"));
const checkAuth_js_1 = __importDefault(require("../middleware/checkAuth.js"));
const router = express_1.default.Router();
router.post('/login', admin_controllers_1.adminLogin);
router.use(checkAuth_js_1.default);
router.use(checkAdmin_1.default);
router.delete('/delete-proverb/:pid', admin_controllers_1.deleteProverb);
router.patch('/edit-proverb/:pid', admin_controllers_1.editProverb);
router.patch('/approve-proverb/:pid', admin_controllers_1.approveProverb);
module.exports = router;
