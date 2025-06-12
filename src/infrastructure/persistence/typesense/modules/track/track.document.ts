import { AlbumType } from '../../../../../core/domain/components/album/constants/album-types';

export class Track {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly album: {
      id: string;
      name: string;
      type: AlbumType;
      artists: { id: string; name: string }[];
      cover?: string;
    },
    public readonly albumName: string,
    public readonly featArtists: { id: string; name: string }[],
    public readonly allArtistNames: string[],
    public readonly isExplicit: boolean,
    public readonly file?: string,
    public readonly duration?: number,
    public readonly isGlobal: boolean = false,
  ) {}
}
