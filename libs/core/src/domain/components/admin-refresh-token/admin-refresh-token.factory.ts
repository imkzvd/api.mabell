import { AdminRefreshTokenId } from './types';
import { AdminId } from '../admin/types';
import { AdminRefreshToken } from './admin-refresh-token.entity';
import { AdminRole } from '../admin/constants/admin-roles';

export class AdminRefreshTokenFactory {
  static create(props: {
    id: AdminRefreshTokenId;
    owner: AdminId;
    role: AdminRole;
    ip: string;
    userAgent: string;
    createdAt?: Date;
  }) {
    return new AdminRefreshToken(
      props.id,
      props.owner,
      props.role,
      props.ip,
      props.userAgent,
      props.createdAt || new Date(),
    );
  }
}
