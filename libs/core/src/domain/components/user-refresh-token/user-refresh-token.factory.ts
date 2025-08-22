import { UserRefreshTokenId } from './types';
import { UserRefreshToken } from './user-refresh-token.entity';
import { UserId } from '../user/types';

export class UserRefreshTokenFactory {
  static create(props: {
    id: UserRefreshTokenId;
    owner: UserId;
    ip: string;
    userAgent: string;
    createdAt?: Date;
  }) {
    return new UserRefreshToken(
      props.id,
      props.owner,
      props.ip,
      props.userAgent,
      props.createdAt || new Date(),
    );
  }
}
