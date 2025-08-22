import { SetMetadata } from '@nestjs/common';
import { Domain } from '@api.mabell/core';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Domain.Admin.AdminRole[]) => SetMetadata(ROLES_KEY, roles);
