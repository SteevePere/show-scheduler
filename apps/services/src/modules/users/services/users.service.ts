import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { FindUserData, FindUserResult } from '../dtos/find-user.dto';
import {
  RegisterUserData,
  RegisterUserResult,
} from '../dtos/register-user.dto';
import { UpdateUserData, UpdateUserResult } from '../dtos/update-user.dto';
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

    data.password = await this.hashPassword(data.password);
    const userToSave = this.usersRepository.create({ ...data });
    const newUser = await this.usersRepository.save(userToSave);

    return {
      user: createUserObjectFromEntity({
        userEntity: newUser,
      }),
    };
  }

  async findUser(data: FindUserData): Promise<FindUserResult> {
    const { includePassword = false, includeResetPasswordToken = false } = data;
    const userEntity = await this.findUserEntity(data);

    return {
      user: createUserObjectFromEntity({
        userEntity,
        includePassword,
        includeResetPasswordToken,
      }),
    };
  }

  private async findUserEntity(data: FindUserData): Promise<UserEntity> {
    const { id, email, relations = [], includePassword } = data;
    const foundUser = await this.usersRepository.findOne({
      where: [{ id }, { email }],
      relations,
    });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return includePassword ? foundUser : omit(foundUser, ['password']);
  }

  async updateUser(data: UpdateUserData): Promise<UpdateUserResult> {
    const user = await this.findUserEntity({
      id: data.id,
    });

    try {
      if (data.data.password) {
        data.data.password = await this.hashPassword(data.data.password);
      }

      Object.assign(user, { ...data.data });
      const savedUser = await this.usersRepository.save(user);
      return { user: createUserObjectFromEntity({ userEntity: savedUser }) };
    } catch (error) {
      throw new InternalServerErrorException('Unable to update User', error);
    }
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
