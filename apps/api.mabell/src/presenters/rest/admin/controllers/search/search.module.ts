import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { GetAlbumsHandler } from '../../../../../core/app/components/search/queries/get-albums/get-albums.handler';
import { GetArtistsHandler } from '../../../../../core/app/components/search/queries/get-artists/get-artists.handler';
import { GetItemsHandler } from '../../../../../core/app/components/search/queries/get-items/get-items.handler';
import { GetPlaylistsHandler } from '../../../../../core/app/components/search/queries/get-playlists/get-playlists.handler';
import { GetTracksHandler } from '../../../../../core/app/components/search/queries/get-tracks/get-tracks.handler';
import { GetUsersHandler } from '../../../../../core/app/components/search/queries/get-users/get-users.handler';
import { TypesenseModule } from '../../../../../infrastructure/persistence/typesense/typesense.module';

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
