import { Artist } from '../../../../domain/components/artist';
import { ArtistEventPayload } from '../../../events/artist/types';

export function prepareArtistEventPayload(artist: Artist): ArtistEventPayload {
  return {
    id: artist.getId(),
    name: artist.getName().value,
    avatar: artist.getAvatar(),
    isPublic: artist.getPublicStatus(),
  };
}
