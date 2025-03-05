import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { RegisterInput } from 'src/auth/dto/register.input';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(input: RegisterInput) {
    try {
      const mobile = input.mobile;
      const existingUser = await this.prisma.user.findFirst({ where: { mobile } });
      if (existingUser) {
        throw new BadRequestException('Mobile is already registered');
      }
      const hashedPassword = await bcrypt.hash(input.password, 10);

      const result = await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            first_name: input.first_name,
            last_name_id: input.last_name_id,
            email: input.email,
            mobile: input.mobile,
            password: hashedPassword, // Store hashed password
            sub_community_id: input.sub_community_id,
            local_community_id: input.local_community_id,
            gender: input.gender,
            profile_pic: input.profile_pic,
          },
        });

        const userAddressData = {
          user_id: user.id,
          address: input.address,
          city_id: input.city_id,
          state_id: input.state_id,
        };

        await tx.userAddress.create({
          data: userAddressData,
        });
        return this.generateTokens(user.id, user.mobile, user.role);
      });
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async validateUser(mobile: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { mobile },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid mobile');
    }
    console.log('kunjan: ', password, mobile);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  generateTokens(userId: number, mobile: string, role: string) {
    const payload = { id: userId, mobile, role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '35m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken, message: 'Success' };
  }

  async login(mobile: string, password: string) {
    const user = await this.validateUser(mobile, password);

    // Generate JWT Token
    const payload = { id: user.id, mobile: user.mobile, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      message: 'Login successful',
    };
  }

  async refreshToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      return this.generateTokens(decoded.id, decoded.mobile, decoded.role);
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token', err.message);
    }
  }
}
