import { Track, TrackId } from '../track.entity';

export const TRACK_WRITE_REPOSITORY_DI_TOKEN = Symbol('TRACK_WRITE_REPOSITORY_DI_TOKEN');

export interface TrackWriteRepository {
  save(entity: Track): Promise<void>;
  saveMany(entities: Track[]): Promise<void>;
  deleteById(id: string): Promise<boolean>;
  deleteByArtistId(artistId: string): Promise<void>;
  findById(id: string): Promise<Track | null>;
  findByAlbumId(albumId: string): Promise<Track[]>;
  findByFeatArtistId(artistId: string): Promise<Track[]>;
  existsById(id: string): Promise<TrackId | null>;
  getNextAlbumTrackIndex(albumId: string): Promise<number>;
}
