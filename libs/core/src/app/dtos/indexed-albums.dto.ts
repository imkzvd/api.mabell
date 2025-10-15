import { OffsetLimitPaginationResponseDTO } from '../../shared/dtos';
import { IndexedAlbumDTO } from './indexed-album.dto';

export class IndexedAlbumsDTO extends OffsetLimitPaginationResponseDTO<IndexedAlbumDTO> {}
