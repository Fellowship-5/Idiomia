import express from 'express';
import { deleteProverb, editProverb, approveProverb, getProverbs } from './admin-controllers';
import checkAdmin from './checkAdmin'
const router = express.Router();

router.use(checkAdmin)
router.get('/all-proverbs', getProverbs);
router.delete('/delete-proverb/:pid', deleteProverb);
router.patch('/edit-proverb/:pid', editProverb);
router.patch('/approve-proverb/:pid', approveProverb);


export = router;
