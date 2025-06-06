import { AlbumType } from '../../../../../../domain/components/album/constants/album-types';

export class IndexedAlbumDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly artists: { id: string; name: string }[],
    public readonly type: AlbumType,
    public readonly cover: string | null,
    public readonly releaseAt: Date | null,
    public readonly isPublic: boolean,
  ) {}
}
