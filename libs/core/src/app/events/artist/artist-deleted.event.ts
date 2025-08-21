import { Event } from '../../ports/event-bus/types';
import { ArtistId } from '../../../domain/components/artist/types';

export type ArtistDeletedEventPayload = {
  id: ArtistId;
};

export class ArtistDeletedEvent extends Event<ArtistDeletedEventPayload> {
  public readonly name = 'artist.deleted';

  constructor(public readonly payload: ArtistDeletedEventPayload) {
    super();
  }
}
