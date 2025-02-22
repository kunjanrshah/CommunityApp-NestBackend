import { SetMetadata } from '@nestjs/common';

/**
 * `@Public()` decorator marks an endpoint as publicly accessible.
 * It sets metadata that can be read by the AuthGuard.
 */
export const Public = () => SetMetadata('isPublic', true);
