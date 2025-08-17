import { Event } from '../../ports';
import { PlaylistId } from '../../../../domain/components/playlist';

export type PlaylistDeletedEventPayload = {
  id: PlaylistId;
};

export class PlaylistDeletedEvent extends Event<PlaylistDeletedEventPayload> {
  public readonly name = 'playlist.deleted';

  constructor(public readonly payload: PlaylistDeletedEventPayload) {
    super();
  }
}
