import { Artist, ArtistId } from '../artist.entity';

export const ARTIST_WRITE_REPOSITORY_DI_TOKEN = Symbol('ARTIST_WRITE_REPOSITORY_DI_TOKEN');

export type ArtistWriteRepository = {
  save(entity: Artist): Promise<void>;
  deleteById(id: string): Promise<ArtistId | null>;
  findById(id: string): Promise<Artist | null>;
  findByIds(ids: string[]): Promise<{
    items: Artist[];
    foundIds: ArtistId[];
    missingIds: string[];
  }>;
  existsById(id: string): Promise<ArtistId | null>;
};
