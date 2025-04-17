import { AlbumDTO } from '../../album/dtos/album.dto';
import { ArtistDTO } from '../../artist/dtos/artist.dto';

export class TrackWithAlbumAndArtistsDTO {
  constructor(
    public readonly id: string,
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
