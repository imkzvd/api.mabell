import { UserRefreshTokenId } from './types';
import { UserId } from '../user/types';
import { UserRefreshToken } from './user-refresh-token.entity';

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
