import { BadRequestException } from '@core/shared/exceptions';
import { AlbumType, AlbumTypes } from '../constants/album-types';

export class AlbumTypeVO {
  private constructor(public readonly value: AlbumType) {}

  static create(value: string): AlbumTypeVO {
    if (!(Object.values(AlbumTypes) as string[]).includes(value)) {
      throw new BadRequestException('Invalid album type');
    }

    return new AlbumTypeVO(value as AlbumType);
  }
}
