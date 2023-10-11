import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/users.entity';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { message } from 'src/constants/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const user: CreateUserDto = new User();
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);
      user.username = createUserDto.username;
      user.email = createUserDto.email;
      user.password = hashPassword;
      const response = await this.userRepository.save(user);
      if (response)
        return response;
      else
        throw new Error(message.USER_NOT_CREATED);
    } catch (err) {
      throw new Error(message.USER_CREATE);
    }
  }

  async findOne(email: string, password?: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      const isMatch = await bcrypt.compare(password, user.password);
      if (user && isMatch)
        return user;
      else
        throw new Error(message.USER_NOT_FOUND);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (user)
        throw new Error(message.USER_ALREADY_EXIST);
      else
        return user;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findAllUser() {
    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/random');
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
