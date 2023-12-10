import { ProductsService } from '../services/products.service.js';

export class ProductsController {
  productsService = new ProductsService();

  /** 상품 생성 api */
  createProduct = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        throw new Error('상품명 또는 상품 내용을 입력해주세요.');
      }

      const status = 'FOR_SALE';
      const userId = req.user.userId;

      const createdProduct = await this.productsService.createProduct(
        title,
        content,
        status,
        userId,
      );

      const product = {
        title: createdProduct.title,
        content: createdProduct.content,
        status: createdProduct.status,
        userId: createdProduct.userId,
      };

      return res.status(201).json({ product });
    } catch (err) {
      next(err);
    }
  };

  /** 상품 목록 조회 api */
  getProducts = async (req, res, next) => {
    try {
      const products = await this.productsService.findAllProducts();

      return res.status(200).json({ products });
    } catch (err) {
      next(err);
    }
  };

  /** 상품 상세 조회 api */

  getProductById = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await this.productsService.getProductById(productId);
      return res.status(200).json({
        title: product.title,
        content: product.content,
        name: product.name,
        status: product.status,
        createdAt: product.createdAt
      });
    } catch (err) {
      next(err);
    }
  };

  /** 상품 수정 api */

  updateProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { title, content, status } = req.body;
      const userId = req.user.userId;
      const updatedProduct = await this.productsService.updateProduct(
        productId,
        title,
        content,
        status,
        userId,
      );

      return res.status(200).json({
        title: updatedProduct.title,
        content: updatedProduct.content,
        status: updatedProduct.status,
      });
    } catch (err) {
      next(err);
    }
  };

  /** 상품 삭제 api */

  deleteProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const userId = req.user.userId;
      const deleteProduct = await this.productsService.deleteProduct(
        productId,
        userId,
      );

      return res.status(200).json({
        data: deleteProduct.productId,
        message: '상품 삭제에 성공하였습니다.',
      });
    } catch (err) {
      next(err);
    }
  };
}
