import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto) {
    const user = this.userRepo.create(data);
    return await this.userRepo.save(user);
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findById(id: string) {
    return await this.userRepo.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }
}
