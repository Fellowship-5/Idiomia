import express from 'express'; 
import adminControllers from './admin-controllers'; 
import checkAdmin from './checkAdmin'
const router = express.Router(); 

router.use(checkAdmin)
// router.delete('/delete-proverb/:pid', adminControllers.deleteProverb); 


export default router;
