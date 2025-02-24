import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class DomainModule {}
