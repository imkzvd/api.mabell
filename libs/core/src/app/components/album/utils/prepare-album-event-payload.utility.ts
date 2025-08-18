import { AlbumDTO } from '../../../dtos';
import { AlbumEventPayload } from '../../../events/album/types';

export function prepareAlbumEventPayload(album: AlbumDTO): AlbumEventPayload {
  return {
    id: album.id,
    name: album.name,
    artists: album.artists.map((i) => i),
    cover: album.cover,
    isPublic: album.isPublic,
  };
}
