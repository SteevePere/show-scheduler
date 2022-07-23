import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  RegisterUserData,
  RegisterUserResult,
} from '../dtos/register-user.dto';
import { UserEntity } from '../entities/user.entity';
import { createUserObjectFromEntity } from '../transformers/user-object.transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async registerUser(data: RegisterUserData): Promise<RegisterUserResult> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const userToSave = this.usersRepository.create({ ...data });
    const newUser = await this.usersRepository.save(userToSave);

    return { user: createUserObjectFromEntity(newUser) };
  }
}
