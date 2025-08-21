import { OffsetLimitPaginationResponseDTO } from '../../shared/dtos';
import { PlaylistDTO } from './playlist.dto';

export class PlaylistsDTO extends OffsetLimitPaginationResponseDTO<PlaylistDTO> {}
