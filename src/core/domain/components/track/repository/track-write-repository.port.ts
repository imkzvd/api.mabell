import { Track, TrackId } from '../track.entity';

export const TRACK_WRITE_REPOSITORY_DI_TOKEN = Symbol('TRACK_WRITE_REPOSITORY_DI_TOKEN');

export interface TrackWriteRepository {
  save(entity: Track): Promise<void>;
  saveMany(entities: Track[]): Promise<void>;
  deleteById(id: string): Promise<TrackId | null>;
  deleteByArtistId(artistId: string): Promise<{
    deletedIds: TrackId[];
    total: number;
  }>;
  findById(id: string): Promise<Track | null>;
  findByAlbumId(albumId: string): Promise<{
    items: Track[];
    total: number;
  }>;
  findByFeatArtistId(artistId: string): Promise<{
    items: Track[];
    total: number;
  }>;
  existsById(id: string): Promise<TrackId | null>;
  getNextAlbumTrackIndex(albumId: string): Promise<number>;
}
