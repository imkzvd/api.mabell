import { EntityId } from '../../common/types/entity-id.type';
import { NameVO } from './vos/name.vo';
import { DurationVO } from './vos/duration.vo';
import { AlbumId } from '../album/album.entity';
import { ArtistId } from '../artist/artist.entity';

export type TrackId = EntityId<'Track'>;

export class Track {
  constructor(
    private readonly _id: TrackId,
    private _name: NameVO,
    private _album: AlbumId,
    private _artists: Set<ArtistId>,
    private _featArtists: Set<ArtistId>,
    private _trackNumber: number,
    private _file: string | null,
    private _duration: DurationVO | null,
    private _isExplicit: boolean,
    private _isActive: boolean,
    private _isPublic: boolean,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  getId(): TrackId {
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

  getAlbum(): AlbumId {
    return this._album;
  }

  getArtists(): ArtistId[] {
    return [...this._artists.values()];
  }

  getTrackNumber(): number {
    return this._trackNumber;
  }

  updateTrackNumber(value: number): Track {
    this._trackNumber = value;
    this.refreshUpdatedAt();

    return this;
  }

  getMainArtist(): ArtistId {
    return [...this._artists.values()][0];
  }

  updateArtists(ids: ArtistId[]): Track {
    this._artists = new Set(ids);
    this.refreshUpdatedAt();

    return this;
  }

  deleteArtist(id: ArtistId): Track {
    this._artists.delete(id);
    this.refreshUpdatedAt();

    return this;
  }

  deleteArtists(ids: ArtistId[]): Track {
    ids.forEach((id) => this._artists.delete(id));
    this.refreshUpdatedAt();

    return this;
  }

  getFeaturedArtists(): ArtistId[] {
    return [...this._featArtists.values()];
  }

  updateFeaturedArtists(ids: ArtistId[]): Track {
    this._featArtists = new Set(ids);
    this.refreshUpdatedAt();

    return this;
  }

  deleteFeaturedArtist(id: ArtistId): Track {
    this._featArtists.delete(id);
    this.refreshUpdatedAt();

    return this;
  }

  deleteFeaturedArtists(ids: ArtistId[]): Track {
    ids.forEach((id) => this._featArtists.delete(id));
    this.refreshUpdatedAt();

    return this;
  }

  deleteAllFeaturedArtists(): Track {
    this._featArtists.clear();
    this.refreshUpdatedAt();

    return this;
  }

  getFile(): string | null {
    return this._file;
  }

  updateFile(value: string | null): Track {
    this._file = value;
    this.refreshUpdatedAt();

    return this;
  }

  deleteFile(): Track {
    this._file = null;
    this.refreshUpdatedAt();

    return this;
  }

  getDuration(): DurationVO | null {
    return this._duration;
  }

  updateDuration(value: number): Track {
    this._duration = DurationVO.create(value);
    this.refreshUpdatedAt();

    return this;
  }

  deleteDuration(): Track {
    this._duration = null;
    this.refreshUpdatedAt();

    return this;
  }

  getExplicitStatus(): boolean {
    return this._isExplicit;
  }

  updateExplicitStatus(value: boolean): Track {
    this._isExplicit = value;
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
