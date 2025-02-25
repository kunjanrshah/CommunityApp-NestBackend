import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard, // ✅ Applies AuthGuard globally
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // ✅ Then, apply role-based authorization globally
    },
  ],
  exports: [],
})
export class DomainModule {}
