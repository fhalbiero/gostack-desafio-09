import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';
import AppError from '@shared/errors/AppError';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      quantity
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const findProduct = this.ormRepository.findOne({
      where: { name }
    });

    return findProduct;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map( product => product.id);

    const findProducts = await this.ormRepository.find({
      where: { id: In(productIds) }
    });

    return findProducts;

  }


  public async findAll(): Promise<Product[]> {
    const findProducts = this.ormRepository.find();

    return findProducts;
  }


  public async updateQuantity(products: IUpdateProductsQuantityDTO[],): Promise<Product[]> {

    const findProducts = await this.findAllById(products);

    for (const findProduct of findProducts) {
        const quantity = products.filter( product => findProduct.id === product.id )[0].quantity;
        await this.ormRepository.update({ id: findProduct.id }, { quantity });
    }

    const updatedProducts = await this.findAllById(products);

    return updatedProducts;
  }

}

export default ProductsRepository;
