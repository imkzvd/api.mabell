import { App, Shared } from '@api.mabell/core';
import { ItemWithScore } from '../../../types';

export class AlbumsDTO extends Shared.DTOs.OffsetLimitPaginationResponseDTO<
  ItemWithScore<App.DTOs.IndexedAlbumDTO>
> {}
