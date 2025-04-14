import { WriteRepository } from '../../../common/repository/write-repository.interface';
import { Track, TrackId } from '../track.entity';
import { TrackFilter } from './track.filter';

export const TRACK_WRITE_REPOSITORY_DI_TOKEN = Symbol('TRACK_WRITE_REPOSITORY_DI_TOKEN');

export type TrackWriteRepository = WriteRepository<Track, TrackId, TrackFilter>;
