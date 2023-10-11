import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    private readonly products = [
        {
            id: 1,
            sku: "abc",
            productName: "name 1",
            category: 1
        },
        {
            id: 2,
            sku: "def",
            productName: "name 2",
            category: 2
        },
        {
            id: 3,
            sku: "ghi",
            productName: "name 1",
            category: 2
        },
        {
            id: 4,
            sku: "klm",
            productName: "name 1",
            category: 3
        },
        {
            id: 5,
            sku: "xyz",
            productName: "name 1",
            category: 1
        }
    ];

    findAll() {
        return this.products;
    }
}


@Injectable()
export class PricingService {
    private readonly pricing = [
        {
            sku: "abc",
            price: 10,
        },
        {
            sku: "def",
            price: 20,
        },
        {
            sku: "ghi",
            price: 30,
        },
        {
            sku: "klm",
            price: 40,
        },
        {
            sku: "xyz",
            price: 50,
        }
    ];

    findAll() {
        return this.pricing;
    }
}


@Injectable()
export class CategoriesService {
    private readonly categories = [
        {
            id: 1,
            name: "category 1"
        },
        {
            id: 2,
            name: "category 2"
        },
        {
            id: 3,
            name: "category 3"
        },
        {
            id: 4,
            name: "category 4"
        },
        {
            id: 5,
            name: "category 5"
        }
    ];

    findAll() {
        return this.categories;
    }
}