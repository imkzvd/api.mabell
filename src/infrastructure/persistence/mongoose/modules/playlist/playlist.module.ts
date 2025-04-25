import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlist } from './playlist.document';
import { PlaylistSchema } from './playlist.schema';
import { PLAYLIST_WRITE_REPOSITORY_DI_TOKEN } from '../../../../../core/domain/components/playlist/repository/playlist-write-repository.port';
import { PlaylistReadRepositoryAdapter } from './playlist-read-repository.adapter';
import { PlaylistWriteRepositoryAdapter } from './playlist-write-repository.adapter';
import { PLAYLIST_READ_REPOSITORY_DI_TOKEN } from '../../../../../core/app/components/playlist/ports/repository/playlist-read-repository.port';

@Module({
  imports: [MongooseModule.forFeature([{ name: Playlist.name, schema: PlaylistSchema }])],
  providers: [
    { provide: PLAYLIST_WRITE_REPOSITORY_DI_TOKEN, useClass: PlaylistWriteRepositoryAdapter },
    { provide: PLAYLIST_READ_REPOSITORY_DI_TOKEN, useClass: PlaylistReadRepositoryAdapter },
  ],
  exports: [
    { provide: PLAYLIST_WRITE_REPOSITORY_DI_TOKEN, useClass: PlaylistWriteRepositoryAdapter },
    { provide: PLAYLIST_READ_REPOSITORY_DI_TOKEN, useClass: PlaylistReadRepositoryAdapter },
  ],
})
export class PlaylistModule {}
