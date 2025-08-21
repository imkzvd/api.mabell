import { Track } from '../track.entity';
import { TrackId } from '../types';

export interface TrackWriteRepository {
  save(entity: Track): Promise<void>;

  saveMany(entities: Track[]): Promise<void>;

  deleteById(trackId: string): Promise<TrackId | null>;

  deleteByArtistId(artistId: string): Promise<{
    deletedIds: TrackId[];
    total: number;
  }>;

  deleteByAlbumId(albumId: string): Promise<{
    deletedIds: TrackId[];
    total: number;
  }>;

  findById(trackId: string): Promise<Track | null>;

  findByAlbumId(albumId: string): Promise<{
    items: Track[];
    itemIds: TrackId[];
    total: number;
  }>;

  findByFeatArtistId(artistId: string): Promise<{
    items: Track[];
    itemIds: TrackId[];
    total: number;
  }>;

  existsById(trackId: string): Promise<TrackId | null>;

  getNextTrackIndexByAlbumId(albumId: string): Promise<number>;
}
