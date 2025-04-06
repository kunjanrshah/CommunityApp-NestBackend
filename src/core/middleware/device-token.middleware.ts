import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DeviceTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const deviceToken = req.headers['device-token']; // Get token from header

    if (typeof deviceToken === 'string' && deviceToken.length > 10) {
      req['deviceToken'] = deviceToken; // Attach token to request object
    }

    next();
  }
}
