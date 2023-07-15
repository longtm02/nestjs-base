import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../../database/models/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async searchUser() {
    const queryBuilder = this.userRepository
      .createQueryBuilder()
      .select('*')

    const results = await queryBuilder.getRawMany();

    return results;
  }
}
