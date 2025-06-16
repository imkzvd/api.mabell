import { RefreshTokenId } from './types';
import { AdminId } from '../admin/types';
import { UserId } from '../user/types';
import { RefreshToken } from './refresh-token.entity';

export class RefreshTokenFactory {
  static create(props: {
    id: RefreshTokenId;
    owner: AdminId | UserId;
    ip: string;
    userAgent: string;
    createdAt?: Date;
  }) {
    return new RefreshToken(
      props.id,
      props.owner,
      props.ip,
      props.userAgent,
      props.createdAt || new Date(),
    );
  }
}
