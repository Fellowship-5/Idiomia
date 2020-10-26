import express from 'express'; 
import { deleteProverb } from './admin-controllers'; 
import checkAdmin from './checkAdmin'
const router = express.Router(); 

router.use(checkAdmin)

router.delete('/delete-proverb/:pid', deleteProverb); 


export = router;
