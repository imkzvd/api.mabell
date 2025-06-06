import { AlbumType } from '../../../../../../domain/components/album/constants/album-types';

export class IndexedTrackDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly album: { id: string; name: string; type: AlbumType; releaseAt: Date | null },
    public readonly artists: { id: string; name: string }[],
    public readonly featuredArtists: { id: string; name: string }[],
    public readonly cover: string | null,
    public readonly file: string | null,
    public readonly duration: number | null,
    public readonly isPublic: boolean,
    public readonly isExplicit: boolean,
  ) {}
}
