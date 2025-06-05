import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdatePlaylistCoverCommand } from './update-playlist-cover.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { PlaylistUpdatedEvent } from '../../../../common/events/playlist-updated.event';
import { PlaylistService } from '../../../../components/playlist/playlist.service';

@CommandHandler(UpdatePlaylistCoverCommand)
export class UpdatePlaylistCoverHandler implements ICommandHandler<UpdatePlaylistCoverCommand> {
  constructor(
    @Inject(PlaylistService) private readonly _playlistService: PlaylistService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id, payload }: UpdatePlaylistCoverCommand) {
    const updatedPlaylistId = await this._playlistService.updatePlaylistCover(id, payload);

    this._eb.publish(new PlaylistUpdatedEvent({ id: updatedPlaylistId }));

    return updatedPlaylistId;
  }
}
