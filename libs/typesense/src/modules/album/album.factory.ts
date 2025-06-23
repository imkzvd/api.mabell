import { Album } from './album.document';
import { AlbumDTO } from '../../../../../src/core/app/components/album/dtos/album.dto';

export class AlbumFactory {
  static create(dto: AlbumDTO) {
    return new Album(
      dto.id,
      dto.name,
      dto.artists.map(({ id, name }) => ({ id, name })),
      dto.artists.map(({ name }) => name),
      dto.type,
      dto.cover || undefined,
      dto.isPublic || dto.artists.every(({ isPublic }) => isPublic),
    );
  }
}
