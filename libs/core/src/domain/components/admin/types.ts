import { EntityId } from '../../common/types/entity-id.type';
import { AdminRoles } from './constants/admin-roles';

export type AdminId = EntityId<'Admin'>;

export type AdminRoleLabel = keyof typeof AdminRoles;

export type AdminRole = (typeof AdminRoles)[AdminRoleLabel];
