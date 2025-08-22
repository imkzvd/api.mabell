import { ArtistDTO } from '../../dtos';

export interface ArtistReadRepository {
  findById(
    artistId: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<ArtistDTO | null>;

  getPublicStatusById(artistId: string): Promise<boolean>;
}
