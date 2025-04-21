import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseReadRepository } from '../../base/base-read-repository.abstract';
import TrackMapper from './track.mapper';
import { Track } from './track.document';
import { TrackWithAlbumAndArtistDocument } from './types';
import { TrackReadRepository } from '../../../../../core/app/components/track/ports/repository/track-read-repository.port';
import { TrackFilter } from '../../../../../core/app/components/track/ports/repository/track.filter';
import { TrackDTO } from '../../../../../core/app/components/track/ports/repository/dtos/track.dto';
import { TrackWithAlbumAndArtistsDTO } from '../../../../../core/app/components/track/ports/repository/dtos/track-with-album-and-artists.dto';
import { POPULATE_OPTIONS } from './constants';

@Injectable()
export class TrackReadRepositoryAdapter
  extends BaseReadRepository<
    Track,
    TrackDTO,
    TrackFilter,
    TrackWithAlbumAndArtistDocument,
    TrackWithAlbumAndArtistsDTO
  >
  implements TrackReadRepository
{
  constructor(
    @InjectModel(Track.name)
    private readonly _trackModel: Model<Track>,
  ) {
    super(_trackModel, TrackMapper, POPULATE_OPTIONS);
  }
}
