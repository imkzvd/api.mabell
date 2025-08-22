import { OffsetLimitPaginationResponseDTO } from '../../shared/dtos';
import { TrackWithAlbumDTO } from './track-with-album.dto';

export class TracksDTO extends OffsetLimitPaginationResponseDTO<TrackWithAlbumDTO> {}
