import { GenreVO } from '../../common/vos/genre.vo';
import { HexColorVO } from '../../common/vos/hex-color.vo';
import { DescriptionVO } from './vos/description.vo';
import { NameVO } from './vos/name.vo';
import { PlaylistId } from './types';
import { UserId } from '../user/types';
import { TrackId } from '../track/types';

export class Playlist {
  constructor(
    private readonly _id: PlaylistId,
    private readonly _user: UserId,
    private _name: NameVO,
    private _genres: GenreVO[],
    private _cover: string | null,
    private _color: HexColorVO | null,
    private _description: DescriptionVO,
    private _tracks: Map<TrackId, Date>,
    private _isPublic: boolean,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  getId(): PlaylistId {
    return this._id;
  }

  getUser(): UserId {
    return this._user;
  }

  getName(): NameVO {
    return this._name;
  }

  updateName(value: string): this {
    this._name = NameVO.create(value);
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

  getTracks(): Map<TrackId, Date> {
    return this._tracks;
  }

  getTracksTotal(): number {
    return this._tracks.size;
  }

  addTrack(id: TrackId): Playlist {
    this._tracks.set(id, new Date());
    this.refreshUpdatedAt();

    return this;
  }

  deleteTrack(id: TrackId | string): Playlist {
    this._tracks.delete(id as TrackId);
    this.refreshUpdatedAt();

    return this;
  }

  deleteTracks(ids: (TrackId | string)[]): Playlist {
    ids.forEach((id) => this._tracks.delete(id as TrackId));
    this.refreshUpdatedAt();

    return this;
  }

  deleteAllTracks(): Playlist {
    this._tracks.clear();
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
