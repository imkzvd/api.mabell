import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import { CreatePlaylistCommand } from './create-playlist.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { PlaylistCreatedEvent } from '../../../../common/events/playlist-created.event';
import { PlaylistService } from '../../../../components/playlist/playlist.service';
import { UserService } from '../../../../components/user/user.service';

@CommandHandler(CreatePlaylistCommand)
export class CreatePlaylistHandler implements ICommandHandler<CreatePlaylistCommand> {
  constructor(
    @Inject(UserService) private readonly _userService: UserService,
    @Inject(PlaylistService) private readonly _playlistService: PlaylistService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ ownerId }: CreatePlaylistCommand) {
    const verifiedUserId = await this._userService.verifyUserId(ownerId);

    if (!verifiedUserId) {
      throw new NotFoundException('User does not exist');
    }

    const createdPlaylistId = await this._playlistService.createPlaylist({
      ownerId: verifiedUserId,
    });

    this._eb.publish(new PlaylistCreatedEvent({ id: createdPlaylistId }));

    return createdPlaylistId;
  }
}
