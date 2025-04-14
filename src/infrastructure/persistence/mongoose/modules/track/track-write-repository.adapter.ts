import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseWriteRepository } from '../../base/base-write-repository.abstract';
import { Track as TrackDocument } from './track.document';
import TrackMapper from './track.mapper';
import { TrackWriteRepository } from '../../../../../core/domain/components/track/repository/track-write-repository.port';
import { Track, TrackId } from '../../../../../core/domain/components/track/track.entity';
import { TrackFilter } from '../../../../../core/domain/components/track/repository/track.filter';

@Injectable()
export class TrackWriteRepositoryAdapter
  extends BaseWriteRepository<TrackDocument, Track, TrackId, TrackFilter>
  implements TrackWriteRepository
{
  constructor(
    @InjectModel(TrackDocument.name)
    private readonly _trackModel: Model<TrackDocument>,
  ) {
    super(_trackModel, TrackMapper);
  }
}
