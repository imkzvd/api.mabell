import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdatePlaylistCommand } from './update-playlist.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { PlaylistUpdatedEvent } from '../../../../common/events/playlist-updated.event';
import { PlaylistService } from '../../../../components/playlist/playlist.service';

@CommandHandler(UpdatePlaylistCommand)
export class UpdatePlaylistHandler implements ICommandHandler<UpdatePlaylistCommand> {
  constructor(
    @Inject(PlaylistService) private readonly _playlistService: PlaylistService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id, payload }: UpdatePlaylistCommand) {
    const updatedPlaylistId = await this._playlistService.updatePlaylist(id, payload);

    this._eb.publish(new PlaylistUpdatedEvent({ id: updatedPlaylistId }));

    return updatedPlaylistId;
  }
}
