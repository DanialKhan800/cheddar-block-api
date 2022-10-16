import express from 'express';
import multer from 'multer';
import auth from "../middleware/auth.js"
import { signin, signup, userVerification,getAllUsers,changeUserPassword,setUserPlayMode } from '../controllers/users.js';
import {validate,userRegistrationRules,userVerficationRules,userSigninRules,userPlayModeRules} from '../validation/user/user.validator.js'
import {filestoreage} from '../middleware/multer.js';
const upload = multer({storage:filestoreage});

const router = express.Router();

router.post('/signin',userSigninRules(), validate, signin);
// router.post('/signup', upload.single('profilepic'),signup);
router.post('/signup', userRegistrationRules(), validate ,signup);
router.post('/userverification',userVerficationRules(),validate, userVerification);
router.post('/changepassword', changeUserPassword);
router.get('/getAllUsers', getAllUsers);
router.post('/userplaymode',userPlayModeRules(),validate, auth,setUserPlayMode);

export default router;