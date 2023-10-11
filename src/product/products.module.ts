import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService, PricingService, CategoriesService } from './product.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PricingService, CategoriesService],
})
export class ProductsModule {}