import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RegistrationDTO } from './dto/registration.dto';

@Controller("API")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/Registration")
  registration(@Body() registrationDTO:RegistrationDTO): string {
    return this.appService.registration(registrationDTO);
  }
}
