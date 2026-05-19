import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPO } from 'src/configuration/keys/keys';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPO) private readonly repo: Repository<Product>,
  ) {
    this.findAll();
  }

  create() {
    return this.repo.save({
      name: 'Test',
      price: 220,
    });
  }

  async findAll() {
    const products = await this.repo.find({ withDeleted: true });
    console.log(products[0].name);
    console.log(products);
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    await this.repo.softDelete(id);
    return `This action removes a #${id} product`;
  }

  async addProductToCart() {}

  findOneCart() {
    throw new Error('Method not implemented.');
  }
}
