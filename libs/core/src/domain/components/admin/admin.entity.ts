import { AdminRoleVO } from './vos/admin-role.vo';
import { UsernameVO } from './vos/username.vo';
import { NameVO } from './vos/name.vo';
import { HashedPasswordVO } from '../../common/vos';
import { AdminId } from './types';

export class Admin {
  constructor(
    private readonly _id: AdminId,
    private _username: UsernameVO,
    private _password: HashedPasswordVO,
    private _name: NameVO,
    private _isBlocked: boolean,
    private _role: AdminRoleVO,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  getId(): AdminId {
    return this._id;
  }

  getUsername(): UsernameVO {
    return this._username;
  }

  updateUsername(value: string): this {
    this._username = UsernameVO.create(value);
    this.refreshUpdatedAt();

    return this;
  }

  getPassword(): HashedPasswordVO {
    return this._password;
  }

  updatePassword(value: string): this {
    this._password = HashedPasswordVO.create(value);
    this.refreshUpdatedAt();

    return this;
  }

  getName(): NameVO {
    return this._name;
  }

  updateName(value: string): Admin {
    this._name = NameVO.create(value);
    this.refreshUpdatedAt();

    return this;
  }

  getBlockedStatus(): boolean {
    return this._isBlocked;
  }

  updateBlockedStatus(value: boolean) {
    this._isBlocked = value;
    this.refreshUpdatedAt();

    return this;
  }

  getRole(): AdminRoleVO {
    return this._role;
  }

  updateRole(role: string): this {
    this._role = AdminRoleVO.create(role);
    this.refreshUpdatedAt();

    return this;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }

  private refreshUpdatedAt(): Admin {
    this._updatedAt = new Date();

    return this;
  }
}
