import express from 'express';
import { deleteProverb, editProverb, approveProverb, adminLogin } from './admin-controllers';
import checkAdmin from './checkAdmin'
import checkAuth from '../middleware/checkAuth.js'
const router = express.Router();

router.post('/login', adminLogin);
router.use(checkAuth);
router.use(checkAdmin)
router.delete('/delete-proverb/:pid', deleteProverb);
router.patch('/edit-proverb/:pid', editProverb);
router.patch('/approve-proverb/:pid', approveProverb);


export = router;
