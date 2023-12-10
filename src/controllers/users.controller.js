import { UsersService } from '../services/auth.service.js';

export class UsersController {
  usersService = new UsersService();

  /** 회원가입 api */
  SignUp = async (req, res, next) => {
    try {
      const { email, name, password, passwordConfirm } = req.body;
      const user = await this.usersService.createUser(
        email,
        name,
        password,
        passwordConfirm,
      );

      const createUser = {
        email: user.email,
        name: user.name,
      };

      return res.status(201).json({ createUser });
    } catch (err) {
      next(err);
    }
  };

  /** 로그인 api */
  SignIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.usersService.getUser(email, password);
      const token = user.token;
      return res.status(200).json({
        token,
        message: '로그인에 성공하였습니다.',
      });
    } catch (err) {
      next(err);
    }
  };
  /**사용자 정보 조회  */
  getUser = async (req, res, next) => {
    try {
      const user = await this.usersService.getUserInfo(req.user.userId);
      return res.status(200).json({
        message: "사용자 정보 조회에 성공했습니다",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };
}
