import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { GqlAuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { EmailService } from './email.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // Use environment variables for security
      signOptions: { expiresIn: '1d' }, // Token expiry
    }),
  ],
  controllers: [],
  providers: [
    AuthService,
    JwtStrategy,
    PrismaService,
    AuthResolver,
    GqlAuthGuard,
    RolesGuard,
    EmailService,
  ],
  exports: [],
})
export class AuthModule {}
