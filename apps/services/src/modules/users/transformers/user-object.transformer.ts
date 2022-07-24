import { UserObject } from '@scheduler/shared';
import { createFromClass } from 'src/core/utils/transformers.util';
import { UserEntity } from 'src/modules/users/entities/user.entity';

interface IUserTransformerData {
  userEntity: UserEntity;
  includePassword?: boolean;
  includeResetPasswordToken?: boolean;
}

export function createUserObjectFromEntity(data: IUserTransformerData) {
  const {
    userEntity: {
      id,
      email,
      password,
      firstName,
      lastName,
      role,
      gender,
      birthDate,
      resetPasswordToken,
      createdAt,
      updatedAt,
    },
    includePassword = false,
    includeResetPasswordToken = false,
  } = data;

  return createFromClass(UserObject, {
    id,
    email,
    password: includePassword ? password : undefined,
    firstName,
    lastName,
    role,
    gender,
    birthDate,
    resetPasswordToken: includeResetPasswordToken
      ? resetPasswordToken
      : undefined,
    createdAt,
    updatedAt,
  });
}
