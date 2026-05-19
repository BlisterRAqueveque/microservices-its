import { Module } from '@nestjs/common';
import { CartModule } from 'src/cart/cart.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productProvider } from './provider/product.provider';
import { ProviderModule } from 'src/configuration/provider/provider.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ...productProvider],
  imports: [CartModule, ProviderModule],
})
export class ProductModule {}
