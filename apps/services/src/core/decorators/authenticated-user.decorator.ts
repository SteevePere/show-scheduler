import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserObject } from '@scheduler/shared';

export const CurrentAuthenticatedUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserObject => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.user) {
      throw new UnauthorizedException('Current authenticated User not found');
    }
    return req.user as UserObject;
  },
);
