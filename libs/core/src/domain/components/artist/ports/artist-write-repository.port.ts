import { Artist } from '../artist.entity';
import { ArtistId } from '../types';

export interface ArtistWriteRepository {
  save(entity: Artist): Promise<void>;

  deleteById(artistId: string): Promise<ArtistId | null>;

  findById(artistId: string): Promise<Artist | null>;

  findByIds(artistIds: string[]): Promise<{
    items: (Artist | null)[];
    foundItems: Artist[];
    foundIds: ArtistId[];
    total: number;
    missingIds: string[];
  }>;

  existsById(artistId: string, isPublic?: boolean): Promise<ArtistId | null>;

  existsByIds(artistIds: string[]): Promise<{
    items: (ArtistId | null)[];
    foundIds: ArtistId[];
    total: number;
    missingIds: string[];
  }>;

  getNextIndex(): Promise<number>;
}
