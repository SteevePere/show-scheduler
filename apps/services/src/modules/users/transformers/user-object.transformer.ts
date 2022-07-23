import { UserObject } from '@scheduler/shared';
import { createFromClass } from 'src/core/utils/transformers.util';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export function createUserObjectFromEntity(userEntity: UserEntity) {
  const {
    id,
    email,
    firstName,
    lastName,
    role,
    gender,
    birthDate,
    createdAt,
    updatedAt,
  } = userEntity;

  return createFromClass(UserObject, {
    id,
    email,
    firstName,
    lastName,
    role,
    gender,
    birthDate,
    createdAt,
    updatedAt,
  });
}
