import {
  Body,
  Controller,
  ForbiddenException,
  Param,
  Patch,
} from '@nestjs/common';
import {
  UpdateUserRequest,
  UpdateUserResponse,
  UserObject,
} from '@scheduler/shared';
import { CurrentAuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { createFromClass } from 'src/core/utils/transformers.util';
import { UpdateUserData } from '../dtos/update-user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(public usersService: UsersService) {}

  @Patch(':id')
  async updateUser(
    @CurrentAuthenticatedUser() currentUser: UserObject,
    @Param('id') id: string,
    @Body() data: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    if (id !== currentUser.id) {
      throw new ForbiddenException(`Unable to update another User's profile`);
    }

    return this.usersService.updateUser(
      createFromClass(UpdateUserData, {
        id,
        data: { ...data },
      }),
    );
  }
}
