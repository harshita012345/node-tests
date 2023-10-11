import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { message } from 'src/constants/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    return await this.usersService.findOne(email, password);
  }

  async login(user: { email: string, password: string }) {
    try {
      const userData = await this.validateUser(user.email, user.password)
      const payload = { email: user.email, password: user.password, username: userData.username };
      return {
        email: user.email,
        username: userData.username,
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signup(user: CreateUserDto) {
    try {
      const { email } = user;

      // Check if the user already exists
      const duplicate = await this.usersService.findOneByEmail(email);

      // Create a new user
      if (!duplicate) {
        const userSave: CreateUserDto = await this.usersService.create(user);
        if (userSave) {
          throw new Error(message.USER_CREATE);
        } else {
          throw new Error(message.USER_NOT_CREATED);
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
