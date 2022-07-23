import { applyDecorators, SetMetadata } from '@nestjs/common';

/**
 * Make a route public and disable authentication.
 *
 * @param skipAuthentication Disable authentication check
 */
export const Public = (skipAuthentication = true) =>
  applyDecorators(SetMetadata('no-auth', skipAuthentication));
