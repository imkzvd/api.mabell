import { Module } from '@nestjs/common';
import { TypesenseModule } from '@infrastructure/typesense';
import { SearchController } from './search.controller';
import { GetAlbumsHandler } from './queries/get-albums.handler';
import { GetArtistsHandler } from './queries/get-artists.handler';
import { GetItemsHandler } from './queries/get-items.handler';
import { GetPlaylistsHandler } from './queries/get-playlists.handler';
import { GetTracksHandler } from './queries/get-tracks.handler';
import { GetUsersHandler } from './queries/get-users.handler';

@Module({
  imports: [TypesenseModule],
  providers: [
    GetAlbumsHandler,
    GetArtistsHandler,
    GetItemsHandler,
    GetPlaylistsHandler,
    GetTracksHandler,
    GetUsersHandler,
  ],
  controllers: [SearchController],
})
export class SearchModule {}
