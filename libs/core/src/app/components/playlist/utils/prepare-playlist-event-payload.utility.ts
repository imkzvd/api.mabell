import { PlaylistDTO } from '../../../dtos';
import { PlaylistEventPayload } from '../../../events/playlist/types';

export function preparePlaylistEventPayload(playlist: PlaylistDTO): PlaylistEventPayload {
  return {
    id: playlist.id,
    name: playlist.name,
    user: {
      id: playlist.user.id,
      name: playlist.user.name,
      isPublic: playlist.user.isPublic,
    },
    cover: playlist.cover,
    isPublic: playlist.isPublic,
  };
}
