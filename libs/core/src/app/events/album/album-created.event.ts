import { Event } from '../../ports';
import { AlbumId } from '../../../../domain/components/album';

export type AlbumCreatedEventPayload = {
  id: AlbumId;
  name: string;
  artists: { id: string; name: string; isPublic: boolean }[];
  cover: string | null;
  isPublic: boolean;
};

export class AlbumCreatedEvent extends Event<AlbumCreatedEventPayload> {
  public readonly name = 'album.created';

  constructor(public readonly payload: AlbumCreatedEventPayload) {
    super();
  }
}
