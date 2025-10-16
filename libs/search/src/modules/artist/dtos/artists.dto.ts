import { App, Shared } from '@api.mabell/core';
import { ItemWithScore } from '../../../types';

export class ArtistsDTO extends Shared.DTOs.OffsetLimitPaginationResponseDTO<
  ItemWithScore<App.DTOs.IndexedArtistDTO>
> {}
