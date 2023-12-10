import { ProductRepository } from '../repositories/products.repository.js';

export class ProductsService {
  productRepository = new ProductRepository();

  //생성
  createProduct = async (title, content, status, userId) => {

    const createdProduct = await this.productRepository.createProduct(
      title,
      content,
      status,
      userId,
    );

    return createdProduct
  };

  // 목록 조회
  findAllProducts = async () => {

    const products = await this.productRepository.findAllProducts();
    if (products.length === 0) {
      const err = new Error("등록된 판매상품이 존재하지 않습니다");
      err.status = 404;
      throw err;
    }

    return products;
  };

  // 상세 조회
  getProductById = async productId => {
    const product = await this.productRepository.getProductById(productId);
    if (!product) {
      const err = new Error("잘못된 검색입니다");
      err.status = 404;
      throw err;
    }
    return product
  };

  //수정
  updateProduct = async (productId, title, content, status, userId) => {
    // 저장소(Repository)에게 특정 상품 하나를 요청합니다.
    const product = await this.productRepository.getProductById(productId);
    if (!product) {
      const err = new Error("존재하지 않는 상품입니다");
      err.status = 404;
      throw err;
    }

    if (userId !== product.userId) {
      const err = new Error("해당 상품에 대한 접근 권한이 없습니다");
      err.status = 403;
      throw err;
    }

    // 저장소(Repository)에게 데이터 수정을 요청합니다.
    const editProduct = await this.productRepository.updateProduct(
      productId,
      title,
      content,
      status,
    );

    return editProduct
  };

  //삭제
  deleteProduct = async (productId, userId) => {
    // 저장소(Repository)에게 특정 상품 하나를 요청합니다.
    const product = await this.productRepository.getProductById(productId);
    if (!product) {
      throw new Error('상품이 존재하지 않습니다.');
    }

    if (userId !== product.userId) {
      throw new Error('작성자가 일치하지 않습니다.')
    }
    // 저장소(Repository)에게 데이터 삭제를 요청합니다.
    await this.productRepository.deleteProduct(productId);

    return product;
  };
}
