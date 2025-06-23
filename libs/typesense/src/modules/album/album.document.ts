import { AlbumType } from '../../../../../src/core/domain/components/album/constants/album-types';

export class Album {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly artists: { id: string; name: string }[],
    public readonly artistNames: string[],
    public readonly type: AlbumType,
    public readonly cover?: string,
    public readonly isGlobal: boolean = false,
  ) {}
}
