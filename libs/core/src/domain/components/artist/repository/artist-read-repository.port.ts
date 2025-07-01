import { ArtistDTO } from './dtos/artist.dto';

export interface ArtistReadRepository {
  findById(
    id: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<ArtistDTO | null>;

  getPublicStatus(id: string): Promise<boolean>;
}
