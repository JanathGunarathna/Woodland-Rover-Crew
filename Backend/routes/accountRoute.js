import express from 'express';
import accountController from '../controllers/accountController.js';

const router = express.Router();

router.post('/', accountController.createAccount);
router.post('/login', accountController.login); // Add login route
router.get('/', accountController.getAllAccount);
router.get('/:id', accountController.getAccountById);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

export default router;