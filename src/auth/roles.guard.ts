import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!requiredRoles) return true; // No roles required, allow access

    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user; // Get user from request

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access Denied: Insufficient Permissions');
    }

    return true; // Access granted
  }
}
