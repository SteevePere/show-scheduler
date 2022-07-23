import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindUserData, FindUserResult } from '../dtos/find-user.dto';
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

    return {
      user: createUserObjectFromEntity({
        userEntity: newUser,
      }),
    };
  }

  async findUser(data: FindUserData): Promise<FindUserResult> {
    const { id, email, includePassword = false } = data;
    const foundUser = await this.usersRepository.findOne({
      where: [{ id }, { email }],
    });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return {
      user: createUserObjectFromEntity({
        userEntity: foundUser,
        includePassword,
      }),
    };
  }
}
