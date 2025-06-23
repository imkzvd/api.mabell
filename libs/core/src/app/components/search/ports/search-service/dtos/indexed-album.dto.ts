import { AlbumType } from '../../../../../../domain/components/album/constants/album-types';
import { IndexedSimplifiedArtistDTO } from './indexed-simplified-artist.dto';

export class IndexedAlbumDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly artists: IndexedSimplifiedArtistDTO[],
    public readonly type: AlbumType,
    public readonly cover: string | null,
  ) {}
}
