import { TrackEventPayload } from '../../../events/track/types';
import { TrackWithAlbumDTO } from '../../../dtos';

export function prepareTrackEventPayload(track: TrackWithAlbumDTO): TrackEventPayload {
  return {
    id: track.id,
    name: track.name,
    album: {
      id: track.album.id,
      name: track.album.name,
      isPublic: track.album.isPublic,
    },
    artists: track.album.artists.map(({ id, name, isPublic }) => ({ id, name, isPublic })),
    featArtists: track.featArtists.map(({ id, name, isPublic }) => ({
      id,
      name,
      isPublic,
    })),
    cover: track.album.cover,
    isPublic: track.isPublic,
    isExplicit: track.isExplicit,
  };
}
