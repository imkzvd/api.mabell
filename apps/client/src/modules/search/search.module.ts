import { Module } from '@nestjs/common';
import { SearchModule as SearchLibModule } from '@api.mabell/search';
import { SearchController } from './search.controller';
import { GetAlbumsHandler } from './queries/get-albums.handler';
import { GetArtistsHandler } from './queries/get-artists.handler';
import { GetItemsHandler } from './queries/get-items.handler';
import { GetPlaylistsHandler } from './queries/get-playlists.handler';
import { GetTracksHandler } from './queries/get-tracks.handler';

@Module({
  imports: [SearchLibModule],
  providers: [
    GetAlbumsHandler,
    GetArtistsHandler,
    GetItemsHandler,
    GetPlaylistsHandler,
    GetTracksHandler,
  ],
  controllers: [SearchController],
})
export class SearchModule {}
