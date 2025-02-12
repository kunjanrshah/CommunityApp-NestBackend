import { Injectable, OnModuleInit } from '@nestjs/common';
import { RegistrationDTO } from './domain/user/dto/user.registration.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) { }

  onModuleInit() {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not set!');
    }

    // Ensure Prisma uses the correct DATABASE_URL
    process.env.DATABASE_URL = databaseUrl;
  }

  registration(registrationDTO:RegistrationDTO) {
    return 'Hello World!';
  }
}
