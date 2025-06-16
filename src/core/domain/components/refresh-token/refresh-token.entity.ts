import { RefreshTokenId } from './types';
import { AdminId } from '../admin/types';
import { UserId } from '../user/types';

export class RefreshToken {
  constructor(
    private readonly _id: RefreshTokenId,
    private readonly _owner: AdminId | UserId,
    private readonly _ip: string,
    private readonly _userAgent: string,
    private readonly _createdAt: Date,
  ) {}

  getId(): RefreshTokenId {
    return this._id;
  }

  getOwner(): UserId | AdminId {
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
