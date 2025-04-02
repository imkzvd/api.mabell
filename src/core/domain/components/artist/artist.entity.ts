import { EntityId } from '../../common/types/entity-id.type';
import { GenreVO } from '../../common/vos/genre.vo';
import { NameVO } from './vos/name.vo';
import { BirthNameVO } from './vos/birth-name.vo';
import { BiographyVO } from './vos/biography.vo';
import { BirthDateVO } from './vos/birth-date.vo';
import { HexColorVO } from '../../common/vos/hex-color.vo';

export type ArtistId = EntityId<'Artist'>;

export class Artist {
  constructor(
    private readonly _id: ArtistId,
    private _name: NameVO,
    private _birthName: BirthNameVO | null,
    private _birthDate: BirthDateVO | null,
    private _genres: GenreVO[],
    private _biography: BiographyVO,
    private _avatar: string | null,
    private _cover: string | null,
    private _accentColor: HexColorVO | null,
    private _secondaryColor: HexColorVO | null,
    private _isActive: boolean,
    private _isPublic: boolean,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  getId(): ArtistId {
    return this._id;
  }

  getName(): NameVO {
    return this._name;
  }

  updateName(value: string): this {
    this._name = NameVO.create(value);
    this.refreshUpdatedAt();

    return this;
  }

  getBirthName(): BirthNameVO | null {
    return this._birthName;
  }

  updateBirthName(value: string): this {
    this._birthName = BirthNameVO.create(value);
    this.refreshUpdatedAt();

    return this;
  }

  getBirthDate(): BirthDateVO | null {
    return this._birthDate;
  }

  updateBirthDate(value: Date | null): this {
    this._birthDate = value ? BirthDateVO.create(value) : null;
    this.refreshUpdatedAt();

    return this;
  }

  getGenres(): GenreVO[] {
    return this._genres;
  }

  updateGenres(value: string[]): this {
    this._genres = value.map((i) => GenreVO.create(i));
    this.refreshUpdatedAt();

    return this;
  }

  getBiography(): BiographyVO {
    return this._biography;
  }

  updateBiography(value: string): this {
    this._biography = BiographyVO.create(value);
    this.refreshUpdatedAt();

    return this;
  }

  getAvatar(): string | null {
    return this._avatar;
  }

  updateAvatar(value: string | null): this {
    this._avatar = value;
    this.refreshUpdatedAt();

    return this;
  }

  deleteAvatar(): this {
    this._avatar = null;
    this.refreshUpdatedAt();

    return this;
  }

  getCover(): string | null {
    return this._cover;
  }

  updateCover(value: string | null): this {
    this._cover = value;
    this.refreshUpdatedAt();

    return this;
  }

  deleteCover(): this {
    this._cover = null;
    this.refreshUpdatedAt();

    return this;
  }

  getAccentColor(): HexColorVO | null {
    return this._accentColor;
  }

  updateAccentColor(value: string | null): this {
    this._accentColor = value ? HexColorVO.create(value) : null;
    this.refreshUpdatedAt();

    return this;
  }

  deleteAccentColor(): this {
    this._accentColor = null;
    this.refreshUpdatedAt();

    return this;
  }

  getSecondaryColor(): HexColorVO | null {
    return this._secondaryColor;
  }

  updateSecondaryColor(value: string | null): this {
    this._secondaryColor = value ? HexColorVO.create(value) : null;
    this.refreshUpdatedAt();

    return this;
  }

  deleteSecondaryColor(): this {
    this._secondaryColor = null;
    this.refreshUpdatedAt();

    return this;
  }

  getActiveStatus(): boolean {
    return this._isActive;
  }

  updateActiveStatus(value: boolean): this {
    this._isActive = value;
    this.refreshUpdatedAt();

    return this;
  }

  getPublicStatus(): boolean {
    return this._isPublic;
  }

  updatePublicStatus(value: boolean): this {
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

  private refreshUpdatedAt(): this {
    this._updatedAt = new Date();

    return this;
  }
}
