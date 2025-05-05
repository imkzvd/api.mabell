import { ArtistDTO } from './dtos/artist.dto';

export const ARTIST_READ_REPOSITORY_DI_TOKEN = Symbol('ARTIST_READ_REPOSITORY_DI_TOKEN');

export interface ArtistReadRepository {
  findById(
    id: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<ArtistDTO | null>;

  getPublicStatus(id: string): Promise<boolean>;
}
