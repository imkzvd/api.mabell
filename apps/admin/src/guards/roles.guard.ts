import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@shared/decorators/is-public.decorator';
import { AdminRole } from '@core/domain/components/admin/constants/admin-roles';
import { AccessTokenPayload } from '@core/app/components/admin-token/types';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const requiredRoles = this.reflector.getAllAndMerge<AdminRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user }: { user: AccessTokenPayload | false } = context.switchToHttp().getRequest();

    if (!user || !requiredRoles.includes(user.role))
      throw new ForbiddenException('Your account does not have access.');

    return true;
  }
}
