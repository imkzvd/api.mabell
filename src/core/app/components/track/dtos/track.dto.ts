import { SimplifiedAlbumDTO } from '../../album/dtos/simplified-album.dto';
import { SimplifiedArtistDTO } from '../../artist/dtos/simplified-artist.dto';

export class TrackDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly albumId: string,
    public readonly album: SimplifiedAlbumDTO,
    public readonly artistIds: string[],
    public readonly artists: SimplifiedArtistDTO[],
    public readonly featArtistIds: string[],
    public readonly featArtists: SimplifiedArtistDTO[],
    public readonly file: string | null,
    public readonly duration: number | null,
    public readonly isExplicit: boolean,
    public readonly isActive: boolean,
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
