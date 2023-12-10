import { UsersRepository } from '../repositories/users.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UsersService {
  usersRepository = new UsersRepository();

  //회원가입
  createUser = async (email, name, password, passwordConfirm) => {
    //이메일 형식 확인
    const reg_email = /^[A-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if (!reg_email.test(email)) {
      const err = new Error("이메일 형식을 확인해주세요.");
      err.status = 400;
      throw err;
    }
    //패스워드 유효성
    const reg_pw = /^[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!reg_pw.test(password)) {
      const err = new Error("비밀번호는 최소 6자리 이상이어야 합니다.");
      err.status = 400;
      throw err;
    }
    //패스워드 확인 유효성    
    if (password !== passwordConfirm) {
      const err = new Error("passwordConfirm을 확인해주세요.");
      err.status = 400;
      throw err;
    }
    const existUser = await this.usersRepository.findUserByEmail(email);
    if (existUser) {
      const err = new Error("이미 가입 된 이메일입니다");
      err.status = 409;
      throw err;
    }

    // 비밀번호 암호화
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS));

    const user = await this.usersRepository.createUser(
      email,
      name,
      hashPassword,
    );

    return user;
  };

  //로그인
  getUser = async (email, password) => {
    const existUser = await this.usersRepository.findUserByEmail(email);

    if (!existUser || !bcrypt.compareSync(password, existUser.password)) {
      const err = new Error("이메일&비밀번호를 확인해주세요");
      err.status = 400;
      throw err;
    }
    // 데이터베이스에 저장된 해싱된 비밀번호와 입력된 password를 비교 match가 true면 일치
    const match = bcrypt.compareSync(password, existUser.password);
    if (!match) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    // 토큰의 만료시간 설정 12시간..
    const token = jwt.sign(
      { userId: existUser.userId },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: '12h',
      },
    );
    // res.cookie('authorization', `Bearer ${token}`);
    const user = {
      token
    }
    return user;
  };
  getUserInfo = async (userId) => {
    const user = await this.usersRepository.findUserId(userId);

    return user;
  }
}
