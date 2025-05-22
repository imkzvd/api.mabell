import { AlbumWithArtistsDTO } from '../../../album/repository/dtos/album-with-artists.dto';
import { ArtistDTO } from '../../../artist/repository/dtos/artist.dto';

export class TrackWithAlbumAndArtistsDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly album: AlbumWithArtistsDTO,
    public readonly trackNumber: number,
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
