import { OffsetLimitPaginationResponseDTO } from '../../shared/dtos';
import { AlbumDTO } from './album.dto';

export class AlbumsDTO extends OffsetLimitPaginationResponseDTO<AlbumDTO> {}
