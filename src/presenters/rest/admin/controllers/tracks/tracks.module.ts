import { Module } from '@nestjs/common';
import { TmpFileStorageModule } from '../../../../../infrastructure/storage/tmp-fs-storage/tmp-file-storage.module';
import { ArtistFileStorageModule } from '../../../../../infrastructure/storage/artist-file-storage/artist-file-storage.module';
import { TracksController } from './tracks.controller';
import { CreateTrackHandler } from '../../../../../core/app/components/track/commands/create-track/create-track.handler';
import { DeleteTrackHandler } from '../../../../../core/app/components/track/commands/delete-track/delete-track.handler';
import { DeleteTrackFileHandler } from '../../../../../core/app/components/track/commands/delete-track-file/delete-track-file.handler';
import { UpdateTrackHandler } from '../../../../../core/app/components/track/commands/update-track/update-track.handler';
import { UpdateTrackFileHandler } from '../../../../../core/app/components/track/commands/update-track-file/update-track-file.handler';
import { GetTrackHandler } from '../../../../../core/app/components/track/queries/get-track/get-track.handler';

@Module({
  imports: [TmpFileStorageModule, ArtistFileStorageModule],
  providers: [
    CreateTrackHandler,
    DeleteTrackHandler,
    DeleteTrackFileHandler,
    UpdateTrackHandler,
    UpdateTrackFileHandler,
    GetTrackHandler,
  ],
  controllers: [TracksController],
})
export class TracksModule {}
