import { IndexedSimplifiedArtistDTO } from './indexed-simplified-artist.dto';
import { IndexedSimplifiedAlbumDTO } from './indexed-simplified-album.dto';

export class IndexedTrackDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly albumId: string,
    public readonly album: IndexedSimplifiedAlbumDTO,
    public readonly artistIds: string[],
    public readonly artists: IndexedSimplifiedArtistDTO[],
    public readonly featArtistIds: string[],
    public readonly featArtists: IndexedSimplifiedArtistDTO[],
    public readonly cover: string | null,
    public readonly isExplicit: boolean,
  ) {}
}
