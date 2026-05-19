import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../keys/keys';
import { Product } from 'src/product/entities/product.entity';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'test',
        entities: [Product],
        synchronize: true, // SOLO EN DESARROLLO
      });

      return dataSource.initialize();
    },
  },
];
