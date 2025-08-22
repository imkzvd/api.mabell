import { UsernameVO } from './vos/username.vo';
import { NameVO } from './vos/name.vo';
import { RegionVO } from '../../common/vos/region.vo';
import { GenreVO } from '../../common/vos/genre.vo';
import { EmailVO } from '../../common/vos/email.vo';
import { HashedPasswordVO } from '../../common/vos';
import { UserId } from './types';
import { BirthDateVO } from './vos/birth-date.vo';

export class User {
  constructor(
    private readonly _id: UserId,
    private _username: UsernameVO,
    private _password: HashedPasswordVO,
    private _name: NameVO,
    private _email: EmailVO | null,
    private _birthDate: BirthDateVO | null,
    private _region: RegionVO,
    private _genres: GenreVO[],
    private _avatar: string | null,
    private _color: string | null,
    private _isBlocked: boolean,
    private _isVerified: boolean,
    private _isPremium: boolean,
    private _isPublic: boolean,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  getId(): UserId {
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

  updateName(value: string): User {
    this._name = NameVO.create(value);
    this.refreshUpdatedAt();

    return this;
  }

  getEmail(): EmailVO | null {
    return this._email;
  }

  updateEmail(value: string): User {
    this._email = EmailVO.create(value);
    this.refreshUpdatedAt();

    return this;
  }

  deleteEmail(): User {
    this._email = null;
    this.refreshUpdatedAt();

    return this;
  }

  getBirthDate(): BirthDateVO | null {
    return this._birthDate;
  }

  updateBirthDate(value: Date | null): User {
    this._birthDate = value ? BirthDateVO.create(value) : null;
    this.refreshUpdatedAt();

    return this;
  }

  getRegion(): RegionVO {
    return this._region;
  }

  updateRegion(value: string): User {
    this._region = RegionVO.create(value);
    this.refreshUpdatedAt();

    return this;
  }

  getGenres(): GenreVO[] {
    return this._genres;
  }

  updateGenres(value: string[]): User {
    this._genres = value.map((i) => GenreVO.create(i));
    this.refreshUpdatedAt();

    return this;
  }

  getAvatar(): string | null {
    return this._avatar;
  }

  updateAvatar(value: string | null): User {
    this._avatar = value;
    this.refreshUpdatedAt();

    return this;
  }

  deleteAvatar(): User {
    this._avatar = null;
    this.refreshUpdatedAt();

    return this;
  }

  getColor(): string | null {
    return this._color;
  }

  updateColor(value: string | null): User {
    this._color = value;
    this.refreshUpdatedAt();

    return this;
  }

  deleteColor(): User {
    this._color = null;
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

  getVerifiedStatus(): boolean {
    return this._isVerified;
  }

  updateVerifiedStatus(value: boolean) {
    this._isVerified = value;
    this.refreshUpdatedAt();

    return this;
  }

  getPremiumStatus(): boolean {
    return this._isPremium;
  }

  updatePremiumStatus(value: boolean): User {
    this._isPremium = value;
    this.refreshUpdatedAt();

    return this;
  }

  getPublicStatus(): boolean {
    return this._isPublic;
  }

  updatePublicStatus(value: boolean): User {
    this._isPublic = value;
    this.refreshUpdatedAt();

    return this;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }

  private refreshUpdatedAt(): User {
    this._updatedAt = new Date();

    return this;
  }
}
