import { AdminRefreshTokenId } from './types';
import { AdminId, AdminRole } from '../admin';

export class AdminRefreshToken {
  constructor(
    private readonly _id: AdminRefreshTokenId,
    private readonly _owner: AdminId,
    private readonly _role: AdminRole,
    private readonly _ip: string,
    private readonly _userAgent: string,
    private readonly _createdAt: Date,
  ) {}

  getId(): AdminRefreshTokenId {
    return this._id;
  }

  getOwner(): AdminId {
    return this._owner;
  }

  getRole(): AdminRole {
    return this._role;
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
