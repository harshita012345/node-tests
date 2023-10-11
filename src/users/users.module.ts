import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserRepository } from './users.repository';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User, UserRepository])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})

export class UsersModule {}
