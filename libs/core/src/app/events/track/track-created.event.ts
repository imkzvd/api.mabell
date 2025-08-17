import { Event } from '../../ports';
import { TrackId } from '../../../../domain/components/track';
import { AlbumId } from '../../../../domain/components/album';
import { ArtistId } from '../../../../domain/components/artist';

export type TrackCreatedEventPayload = {
  id: TrackId;
  name: string;
  album: { id: AlbumId; name: string; isPublic: boolean };
  artists: { id: ArtistId; name: string; isPublic: boolean }[];
  featArtists: { id: ArtistId; name: string; isPublic: boolean }[];
  cover: string | null;
  isPublic: boolean;
  isExplicit: boolean;
};

export class TrackCreatedEvent extends Event<TrackCreatedEventPayload> {
  public readonly name = 'track.created';

  constructor(public readonly payload: TrackCreatedEventPayload) {
    super();
  }
}
