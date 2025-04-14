import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseReadRepository } from '../../base/base-read-repository.abstract';
import TrackMapper from './track.mapper';
import { Track } from './track.document';
import { TrackPopulatedDocument } from './types';
import { TrackReadRepository } from '../../../../../core/app/components/track/ports/repository/track-read-repository.port';
import { TrackDTO } from '../../../../../core/app/components/track/dtos/track.dto';
import { SimplifiedTrackDTO } from '../../../../../core/app/components/track/dtos/simplified-track.dto';
import { TrackFilter } from '../../../../../core/app/components/track/ports/repository/track.filter';
import { POPULATE_OPTIONS } from './constants';

@Injectable()
export class TrackReadRepositoryAdapter
  extends BaseReadRepository<TrackPopulatedDocument, TrackDTO, SimplifiedTrackDTO, TrackFilter>
  implements TrackReadRepository
{
  constructor(
    @InjectModel(Track.name)
    private readonly _trackModel: Model<TrackPopulatedDocument>,
  ) {
    super(_trackModel, TrackMapper, POPULATE_OPTIONS);
  }
}
