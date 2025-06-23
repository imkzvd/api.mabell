import { Track } from './track.document';
import { TrackDTO } from '../../../../../src/core/app/components/track/dtos/track.dto';

export class TrackFactory {
  static create(dto: TrackDTO) {
    return new Track(
      dto.id,
      dto.name,
      {
        id: dto.album.id,
        name: dto.album.name,
        type: dto.album.type,
        artists: dto.artists.map(({ id, name }) => ({ id, name })),
        cover: dto.album.cover || undefined,
      },
      dto.album.name,
      dto.featArtists.map(({ id, name }) => ({ id, name })),
      [
        ...dto.album.artists.map(({ name }) => name),
        ...dto.featArtists.filter(({ isPublic }) => isPublic).map(({ name }) => name),
      ],
      dto.isExplicit,
      dto.file || undefined,
      dto.duration || undefined,
      dto.isPublic && dto.album.isPublic && dto.album.artists.every(({ isPublic }) => isPublic),
    );
  }
}
