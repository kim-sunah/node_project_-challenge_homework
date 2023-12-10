import express from 'express';
const router = express.Router();
import { UsersController } from '../controllers/users.controller.js';
import authMiddleware from '../middlewares/need-signin.middleware.js';

const usersController = new UsersController();

// 회원가입 API
router.post('/sign-up', usersController.SignUp);

// 로그인 API
router.post('/sign-in', usersController.SignIn);

// 내 정보 조회
router.get('/users/me', authMiddleware, usersController.getUser);


export default router;