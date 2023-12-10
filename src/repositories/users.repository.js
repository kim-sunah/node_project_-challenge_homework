import { prisma } from '../utils/prisma/index.js';

export class UsersRepository {
  //회원가입
  createUser = async (email, name, password) => {
    const user = await prisma.users.create({
      data: {
        email,
        name,
        password,
      },
    });
    return user;
  };


  //유저 찾기
  findUserByEmail = async (email) => {
    const existUser = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    return existUser;
  }
  findUserId = async (userId) => {
    const existUser = await prisma.users.findUnique({
      where: {
        userId,
      },
    });
    return existUser;
  }
}
