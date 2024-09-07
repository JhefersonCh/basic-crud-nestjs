import { User } from 'src/shared/entities/user.entity';
import { UserService } from './../services/user/user.service';
import { Injectable } from '@nestjs/common';
import { CreateOrUpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class CrudUserUseCase {
  constructor(private readonly userService: UserService) {}

  async findAll() {
    return await this.userService.findAll();
  }

  async findOne(id: number) {
    return await this.userService.findOne(id);
  }

  async create(user: CreateOrUpdateUserDto) {
    return await this.userService.create(user);
  }

  async update(id: number, user: User) {
    return await this.userService.update(id, user);
  }

  async remove(id: number) {
    return await this.userService.remove(id);
  }
}
