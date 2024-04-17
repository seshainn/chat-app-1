import express from 'express';
import { registerUser } from '../controllers/userControllers.js'
import { loginUser } from '../controllers/userControllers.js'
import { upload } from '../config/multerCode.js';

const router = express.Router();

//router.route('/').post(registerUser)
router.post('/', upload.single("pic"), registerUser);
//router.post('/login', loginUser)
router.post('/login', loginUser)

export default router;