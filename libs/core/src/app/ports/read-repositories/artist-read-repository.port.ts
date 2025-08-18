import { ArtistDTO } from '../../dtos';

export interface ArtistReadRepository {
  findById(
    id: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<ArtistDTO | null>;

  getPublicStatus(id: string): Promise<boolean>;
}
