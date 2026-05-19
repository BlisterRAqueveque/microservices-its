import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { ProviderModule } from './configuration/provider/provider.module';

@Module({
  imports: [ProductModule, CartModule, ProviderModule],
})
export class AppModule {}
