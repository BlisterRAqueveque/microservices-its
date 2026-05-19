import { DATA_SOURCE, PRODUCT_REPO } from 'src/configuration/keys/keys';
import { DataSource } from 'typeorm';
import { Product } from '../entities/product.entity';

export const productProvider = [
  {
    provide: PRODUCT_REPO,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: [DATA_SOURCE],
  },
];
