import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { GetPlaylistQuery } from '@core/app/cqrs/playlist/queries/get-playlist/get-playlist.query';
import { GetPlaylistHandler as CoreGetPlaylistHandler } from '@core/app/cqrs/playlist/queries/get-playlist/get-playlist.handler';

@QueryHandler(GetPlaylistQuery)
export class GetPlaylistHandler extends CoreGetPlaylistHandler {
  constructor(@Inject(PlaylistService) service: PlaylistService) {
    super(service);
  }
}
