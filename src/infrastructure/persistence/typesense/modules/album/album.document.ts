import { AlbumType } from '../../../../../core/domain/components/album/constants/album-types';

export class AlbumDocument {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly artists: { id: string; name: string }[],
    public readonly artistNames: string[],
    public readonly type: AlbumType,
    public readonly isPublic: boolean,
    public readonly cover?: string,
    public readonly releaseAt?: Date,
  ) {}
}
