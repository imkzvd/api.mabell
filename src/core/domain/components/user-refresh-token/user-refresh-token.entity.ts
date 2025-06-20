import { UserRefreshTokenId } from './types';
import { UserId } from '../user/types';

export class UserRefreshToken {
  constructor(
    private readonly _id: UserRefreshTokenId,
    private readonly _owner: UserId,
    private readonly _ip: string,
    private readonly _userAgent: string,
    private readonly _createdAt: Date,
  ) {}

  getId(): UserRefreshTokenId {
    return this._id;
  }

  getOwner(): UserId {
    return this._owner;
  }

  getIp(): string {
    return this._ip;
  }

  getUserAgent(): string {
    return this._userAgent;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }
}
