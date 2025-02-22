import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());

    if (isPublic) {
      return true; // ✅ Allow access to public routes
    }

    const ctx = GqlExecutionContext.create(context).getContext();

    let token = ctx.req.headers.authorization;
    if (token) {
      token = token.split(' ')[1];
      try {
        const user = jwt.verify(token, 'secret');
        ctx.user = user;
        console.log(user);
        return true;
      } catch (e) {
        throw new UnauthorizedException(e.message);
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
