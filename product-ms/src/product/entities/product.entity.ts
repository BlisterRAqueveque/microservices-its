import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: 'Esto es un id autoincremental',
    name: 'id_product',
  })
  id?: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string = '';

  @Column({ type: 'int' })
  price: number = 1;

  @DeleteDateColumn()
  deletedAt?: Date;
}
