import { ArtistId } from '../../domain/components/artist/types';

export class SimplifiedArtistDTO {
  constructor(
    public readonly id: ArtistId,
    public readonly name: string,
    public readonly isPublic: boolean,
  ) {}
}
