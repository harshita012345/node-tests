import { Controller, Get } from '@nestjs/common';
import { CategoriesService, PricingService, ProductsService } from './product.service';

@Controller('api/products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly pricingService: PricingService,
    private readonly categoriesService: CategoriesService,
  ) { }

  @Get('/')
  async getAllProducts() {
    const products = this.productsService.findAll();
    const pricing = this.pricingService.findAll();
    const categories = this.categoriesService.findAll();

    // Combine the data to get the expected result
    const result = products.map(product => {
      const price = pricing.find(p => p.sku === product.sku)?.price || 0;
      const category = categories.find(c => c.id === product.category);
      const products = {
        ...product,
        price,
        // categoryName: category ? category.name : null,
      };
      return products;
    });
    return result;
  }
}