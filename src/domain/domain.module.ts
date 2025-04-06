import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { MastersModule } from './masters/masters.module';
import { AppSearchModule } from './user/appsearch.module';
import { ReminderModule } from './reminder/reminder.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [UserModule, MastersModule, ReminderModule, UploadsModule, AppSearchModule],
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
})
export class DomainModule {}
