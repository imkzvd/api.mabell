import { ArtistDTO } from '../../../../artist/ports/repository/dtos/artist.dto';
import { AlbumWithArtistsDTO } from '../../../../album/ports/repository/dtos/album-with-artists.dto';

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
