import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeletePlaylistCommand } from './delete-playlist.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { PlaylistDeletedEvent } from '../../../../common/events/playlist-deleted.event';
import { PlaylistService } from '../../../../components/playlist/playlist.service';

@CommandHandler(DeletePlaylistCommand)
export class DeletePlaylistHandler implements ICommandHandler<DeletePlaylistCommand> {
  constructor(
    @Inject(PlaylistService) private readonly _playlistService: PlaylistService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id }: DeletePlaylistCommand) {
    const deletedPlaylistId = await this._playlistService.deletePlaylist(id);

    this._eb.publish(new PlaylistDeletedEvent({ id: deletedPlaylistId }));

    return deletedPlaylistId;
  }
}
