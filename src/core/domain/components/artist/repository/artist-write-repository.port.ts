import { Artist } from '../artist.entity';
import { ArtistId } from '../types';

export const ARTIST_WRITE_REPOSITORY_DI_TOKEN = Symbol('ARTIST_WRITE_REPOSITORY_DI_TOKEN');

export interface ArtistWriteRepository {
  save(entity: Artist): Promise<void>;

  deleteById(id: string): Promise<ArtistId | null>;

  findById(id: string): Promise<Artist | null>;

  findByIds(ids: string[]): Promise<{
    items: Artist[];
    foundIds: ArtistId[];
    total: number;
    missingIds: string[];
  }>;

  existsById(id: string): Promise<ArtistId | null>;

  existsByIds(ids: string[]): Promise<{
    foundIds: ArtistId[];
    total: number;
    missingIds: string[];
  }>;

  getNextIndex(): Promise<number>;
}
