import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { GqlAuthGuard } from './auth.guard';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

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
    RolesGuard,
    GqlAuthGuard,
    Reflector,
  ],
  exports: [AuthService, JwtModule, GqlAuthGuard],
})
export class AuthModule {}
