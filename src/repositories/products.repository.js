import { prisma } from '../utils/prisma/index.js';

export class ProductRepository {
  // 생성
  createProduct = async (title, content, status, userId) => {
    const createdProduct = await prisma.products.create({
      data: {
        title,
        content,
        status,
        userId
      },
    });
    return createdProduct;
  };

  //목록 조회
  findAllProducts = async (newSort) => {
    const products = await prisma.products.findMany({
      select: {
        productId: true,
        title: true,
        content: true,
        User: {
          // 1:N 관계를 맺고있는 Users 테이블을 조회합니다.
          select: {
            name: true,
          },
        },
        status: true,
        createdAt: true,
      },

      // 입력받은 newSort로 정렬하겠다.
      orderBy: {
        createdAt: newSort,
      },
    });

    return products;
  };

  //상세 조회
  getProductById = async productId => {
    const product = await prisma.products.findFirst({
      // 입력받은 productId와 일치하는 객체를 가져오겠다.
    where: {
      productId: +productId,
    },
    select: {
      userId: true,
      title: true,
      content: true,
      User: {
        // 1:N 관계를 맺고있는 Users 테이블을 조회합니다.
        select: {
          name: true,
        },
      },
      status: true,
      createdAt: true
    }
    });

    return product;
  };

  //수정
  updateProduct = async (productId, title, content, status) => {
    const updatedProduct = await prisma.products.update({
      where: {
        productId: +productId,
      },
      data: {
        title,
        content,
        status,
      },
    });

    return updatedProduct;
  };

  //삭제
  deleteProduct = async productId => {
    const deleteProduct = await prisma.products.delete({
      where: {
        productId: +productId,
      },
    });

    return deleteProduct;
  };
}
