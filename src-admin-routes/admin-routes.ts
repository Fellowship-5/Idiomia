import express from 'express';
import { deleteProverb, editProverb, approveProverb, getProverbs, getUsers, searchUsers } from './admin-controllers';
import { paginateResponse } from '../services/paginateResponse'
import Proverb from '../models/proverb.js'
import User from '../models/user.js'

import checkAdmin from './checkAdmin'
const router = express.Router();

router.use(checkAdmin)

router.get('/all-proverbs', paginateResponse(Proverb), getProverbs);
router.get('/users/search', searchUsers);
router.get('/all-users', paginateResponse(User), getUsers);
router.delete('/delete-proverb/:pid', deleteProverb);
router.patch('/edit-proverb/:pid', editProverb);
router.patch('/approve-proverb/:pid', approveProverb);


export = router;
