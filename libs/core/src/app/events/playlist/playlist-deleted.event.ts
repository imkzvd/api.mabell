import { Event } from '../../ports/event-bus/types';
import { PlaylistId } from '../../../domain/components/playlist/types';

export type PlaylistDeletedEventPayload = {
  id: PlaylistId;
};

export class PlaylistDeletedEvent extends Event<PlaylistDeletedEventPayload> {
  public readonly name = 'playlist.deleted';

  constructor(public readonly payload: PlaylistDeletedEventPayload) {
    super();
  }
}
