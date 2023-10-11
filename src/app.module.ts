import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './constants/error.handle';
import { ProductsModule } from './product/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    ProductsModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ]
})
export class AppModule { }
