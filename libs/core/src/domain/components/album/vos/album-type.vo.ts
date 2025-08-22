import { AlbumTypes } from '../constants/album-types';
import { BadRequestException } from '../../../../shared/exceptions';
import { AlbumType } from '../types';

export class AlbumTypeVO {
  private constructor(public readonly value: AlbumType) {}

  static create(value: string): AlbumTypeVO {
    if (!(Object.values(AlbumTypes) as string[]).includes(value)) {
      throw new BadRequestException('Invalid album type');
    }

    return new AlbumTypeVO(value as AlbumType);
  }
}
