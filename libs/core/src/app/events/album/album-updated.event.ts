import { Event } from '../../ports';
import { AlbumId } from '../../../../domain/components/album';

export type AlbumUpdatedEventPayload = {
  id: AlbumId;
  name: string;
  artists: { id: string; name: string; isPublic: boolean }[];
  cover: string | null;
  isPublic: boolean;
};

export class AlbumUpdatedEvent extends Event<AlbumUpdatedEventPayload> {
  public readonly name = 'album.updated';

  constructor(public readonly payload: AlbumUpdatedEventPayload) {
    super();
  }
}
