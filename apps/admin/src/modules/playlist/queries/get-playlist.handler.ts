import { QueryHandler } from '@nestjs/cqrs';
import { GetPlaylistQuery } from '@core/app/cqrs/playlist/queries/get-playlist/get-playlist.query';
import { GetPlaylistHandler as CoreGetPlaylistHandler } from '@core/app/cqrs/playlist/queries/get-playlist/get-playlist.handler';
import { PlaylistService } from '@core/app/components/playlist/services/playlist.service';

@QueryHandler(GetPlaylistQuery)
export class GetPlaylistHandler extends CoreGetPlaylistHandler {
  constructor(service: PlaylistService) {
    super(service);
  }
}
