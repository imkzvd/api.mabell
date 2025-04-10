import { EntityId } from '../../common/types/entity-id.type';
import { ArtistId } from '../artist/artist.entity';
import { GenreVO } from '../../common/vos/genre.vo';
import { HexColorVO } from '../../common/vos/hex-color.vo';
import { AlbumTypeVO } from './vos/album-type.vo';
import { NameVO } from '../artist/vos/name.vo';
import { ReleaseDateVO } from './vos/release-date.vo';
import { DescriptionVO } from './vos/description.vo';

export type AlbumId = EntityId<'Album'>;

export class Album {
  constructor(
    private readonly _id: AlbumId,
    private _name: NameVO,
    private _artists: Set<ArtistId>,
    private _type: AlbumTypeVO,
    private _genres: GenreVO[],
    private _cover: string | null,
    private _color: HexColorVO | null,
    private _description: DescriptionVO,
    private _releaseAt: ReleaseDateVO | null,
    private _tracks: Set<string>,
    private _isActive: boolean,
    private _isPublic: boolean,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  getId(): AlbumId {
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

  getArtists(): ArtistId[] {
    return [...this._artists.values()];
  }

  getMainArtist(): ArtistId {
    return [...this._artists.values()][0];
  }

  updateArtists(items: ArtistId[]): this {
    this._artists = new Set(items);
    this.refreshUpdatedAt();

    return this;
  }

  addArtist(item: ArtistId): this {
    this._artists.add(item);
    this.refreshUpdatedAt();

    return this;
  }

  deleteArtist(id: ArtistId): this {
    this._artists.delete(id);
    this.refreshUpdatedAt();

    return this;
  }

  deleteArtists(ids: ArtistId[]): this {
    ids.forEach((id) => this._artists.delete(id));
    this.refreshUpdatedAt();

    return this;
  }

  getType(): AlbumTypeVO {
    return this._type;
  }

  updateType(value: string): this {
    this._type = AlbumTypeVO.create(value);
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

  getColor(): HexColorVO | null {
    return this._color;
  }

  updateColor(value: string | null): this {
    this._color = value ? HexColorVO.create(value) : null;
    this.refreshUpdatedAt();

    return this;
  }

  deleteColor(): this {
    this._color = null;
    this.refreshUpdatedAt();

    return this;
  }

  getDescription(): DescriptionVO {
    return this._description;
  }

  updateDescription(value: string): this {
    this._description = DescriptionVO.create(value);
    this.refreshUpdatedAt();

    return this;
  }

  getReleaseDate(): ReleaseDateVO | null {
    return this._releaseAt;
  }

  updateReleaseDate(value: Date | null): this {
    this._releaseAt = value ? ReleaseDateVO.create(value) : null;
    this.refreshUpdatedAt();

    return this;
  }

  getTracks(start: number = 0, end: number = Infinity): string[] {
    return [...this._tracks.values()].slice(start, end);
  }

  getTracksTotal(): number {
    return this._tracks.size;
  }

  addTrack(id: string): this {
    this._tracks.add(id);
    this.refreshUpdatedAt();

    return this;
  }

  deleteTrack(id: string): this {
    this._tracks.delete(id);
    this.refreshUpdatedAt();

    return this;
  }

  addTracks(ids: string[]): this {
    this._tracks = new Set(ids);
    this.refreshUpdatedAt();

    return this;
  }

  deleteTracks(ids: string[]): this {
    ids.forEach((id) => this._tracks.delete(id));
    this.refreshUpdatedAt();

    return this;
  }

  deleteAllTracks(): this {
    this._tracks.clear();
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
