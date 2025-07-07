import { Module } from '@nestjs/common';
import { RandomIdModule } from '@infrastructure/random-id';
import { FileStorageModule } from '@infrastructure/file-storage';
import { ArtistController } from './artist.controller';
import { GetArtistHandler } from './queries/get-artist.handler';
import { artistServiceProvider } from '../../providers/artist-service.provider';

@Module({
  imports: [RandomIdModule, FileStorageModule],
  providers: [artistServiceProvider, GetArtistHandler],
  controllers: [ArtistController],
})
export class ArtistModule {}
