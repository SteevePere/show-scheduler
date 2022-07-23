import { UserObject } from '@scheduler/shared';
import { createFromClass } from 'src/core/utils/transformers.util';
import { UserEntity } from 'src/modules/users/entities/user.entity';

interface IUserTransformerData {
  userEntity: UserEntity;
  includePassword?: boolean;
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
      createdAt,
      updatedAt,
    },
    includePassword = false,
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
    createdAt,
    updatedAt,
  });
}
