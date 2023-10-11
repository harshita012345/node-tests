import { EntityRepository, Repository } from 'typeorm';
import { User } from './entity/users.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}