import { ArtistDTO } from '../../artist/dtos/artist.dto';
import { AlbumDTO } from '../../album/dtos/album.dto';
import { TrackId } from '../../../../domain/components/track/types';

export class TrackDTO {
  constructor(
    public readonly id: TrackId,
    public readonly name: string,
    public readonly album: AlbumDTO,
    public readonly artists: ArtistDTO[],
    public readonly featArtists: ArtistDTO[],
    public readonly file: string | null,
    public readonly duration: number | null,
    public readonly isExplicit: boolean,
    public readonly isActive: boolean,
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
