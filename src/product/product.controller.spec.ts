import { ProductService } from './product.service';
import { NotFoundError } from '../exceptions/not-found.exceptions';

describe('getProductById', () => {
  let productService: ProductService;
  let productModelMock: any;
  let importProductServiceMock: any;

  beforeEach(() => {
    const id = 29102648;
    productModelMock = {
      findOne: jest
        .fn()
        .mockReturnValue(
          Promise.reject(new NotFoundError('product not found', id.toString())),
        ),
    };
    importProductServiceMock = jest.fn();
    productService = new ProductService(
      productModelMock,
      importProductServiceMock,
    );
  });

  it('should return product if it exists', async () => {
    const id = 29102648;
    const product = { code: id, product_name: 'Product 1' };
    productModelMock.findOne.mockResolvedValue(product);

    const result = await productService.findById(id);
    expect(result).toEqual(product);
  });

  it('should throw error if product does not exist', async () => {
    const id = 1;
    productModelMock.findOne.mockReturnValue(Promise.resolve(null));
    await expect(productService.findById(id)).rejects.toThrowError(
      NotFoundError,
    );
  });
});

export class ProductMock {
  findOne(query: object): any {
    return 'ok';
  }

  exec(): any {
    return 'ok';
  }
}

export const productMockFactory = (): any => {
  return {
    default: ProductMock,
  };
};
