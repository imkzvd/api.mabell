import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlist, PlaylistSchema } from './playlist.schema';
import { PlaylistWriteRepository } from './playlist-write-repository.service';
import { PlaylistReadRepository } from './playlist-read-repository.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Playlist.name, schema: PlaylistSchema }])],
  providers: [PlaylistWriteRepository, PlaylistReadRepository],
  exports: [PlaylistWriteRepository, PlaylistReadRepository],
})
export class PlaylistModule {}
