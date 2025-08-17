import { Event } from '../../ports';
import { ArtistId } from '../../../../domain/components/artist';

export type ArtistDeletedEventPayload = {
  id: ArtistId;
};

export class ArtistDeletedEvent extends Event<ArtistDeletedEventPayload> {
  public readonly name = 'artist.deleted';

  constructor(public readonly payload: ArtistDeletedEventPayload) {
    super();
  }
}
