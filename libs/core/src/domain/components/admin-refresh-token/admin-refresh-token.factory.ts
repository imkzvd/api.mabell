import { AdminRefreshTokenId } from './types';
import { AdminRefreshToken } from './admin-refresh-token.entity';
import { AdminId, AdminRole } from '../admin/types';

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
