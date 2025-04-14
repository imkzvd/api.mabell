import { ReadRepository } from '../../../../common/base/read-repository/read-repository.interface';
import { TrackFilter } from './track.filter';
import { TrackDTO } from '../../dtos/track.dto';
import { SimplifiedTrackDTO } from '../../dtos/simplified-track.dto';

export const TRACK_READ_REPOSITORY_DI_TOKEN = Symbol('TRACK_READ_REPOSITORY_DI_TOKEN');

export type TrackReadRepository = ReadRepository<TrackDTO, SimplifiedTrackDTO, TrackFilter>;
