import { IndexedAlbumDTO } from './indexed-album.dto';
import { IndexedSimplifiedArtistDTO } from './indexed-simplified-artist.dto';

export class IndexedTrackDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly album: IndexedAlbumDTO,
    public readonly featArtists: IndexedSimplifiedArtistDTO[],
    public readonly isExplicit: boolean,
  ) {}
}
