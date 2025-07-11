import { Event } from '@core/app/common/ports/event-bus.port';
import { PlaylistId } from '@core/domain/components/playlist/types';
import { UserId } from '@core/domain/components/user/types';

export type PlaylistUpdatedEventPayload = {
  id: PlaylistId;
  name: string;
  owner: { id: UserId; name: string };
  cover: string | null;
};

export class PlaylistUpdatedEvent extends Event<PlaylistUpdatedEventPayload> {
  public readonly name = 'playlist.updated';

  constructor(public readonly payload: PlaylistUpdatedEventPayload) {
    super();
  }
}
