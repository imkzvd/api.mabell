import { ArtistDTO } from '../../dtos';

export interface ArtistReadRepository {
  findById(
    artistId: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<ArtistDTO | null>;

  findByGenres(genres: string[], options?: Partial<{ limit: number }>): Promise<ArtistDTO[]>;

  getPublicStatusById(artistId: string): Promise<boolean>;
}
