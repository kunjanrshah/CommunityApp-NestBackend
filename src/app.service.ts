import { Injectable } from '@nestjs/common';
import { RegistrationDTO } from './dto/registration.dto';

@Injectable()
export class AppService {
  registration(registrationDTO:RegistrationDTO) {
    return 'Hello World!';
  }
}
