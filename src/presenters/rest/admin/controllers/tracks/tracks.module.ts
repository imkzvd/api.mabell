import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TrackService } from '../../../../../core/app/components/track/track.service';
import { TrackSubscriber } from '../../../../../core/app/components/track/events/track.subscriber';
import { AlbumService } from '../../../../../core/app/components/album/album.service';
import { ArtistService } from '../../../../../core/app/components/artist/artist.service';
import { CreateTrackHandler } from '../../../../../core/app/cqrs/track/commands/create-track/create-track.handler';
import { DeleteTrackHandler } from '../../../../../core/app/cqrs/track/commands/delete-track/delete-track.handler';
import { DeleteTrackFileHandler } from '../../../../../core/app/cqrs/track/commands/delete-track-file/delete-track-file.handler';
import { UpdateTrackHandler } from '../../../../../core/app/cqrs/track/commands/update-track/update-track.handler';
import { UpdateTrackFeatArtistsHandler } from '../../../../../core/app/cqrs/track/commands/update-track-feat-artists/update-track-feat-artists.handler';
import { UpdateTrackFileHandler } from '../../../../../core/app/cqrs/track/commands/update-track-file/update-track-file.handler';
import { GetTrackHandler } from '../../../../../core/app/cqrs/track/queries/get-track/get-track.handler';

@Module({
  providers: [
    ArtistService,
    AlbumService,
    TrackService,
    TrackSubscriber,
    CreateTrackHandler,
    DeleteTrackHandler,
    DeleteTrackFileHandler,
    UpdateTrackHandler,
    UpdateTrackFeatArtistsHandler,
    UpdateTrackFileHandler,
    GetTrackHandler,
  ],
  controllers: [TracksController],
})
export class TracksModule {}
