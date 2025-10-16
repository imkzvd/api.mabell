import { App, Shared } from '@api.mabell/core';
import { ItemWithScore } from '../../../types';

export class TracksDTO extends Shared.DTOs.OffsetLimitPaginationResponseDTO<
  ItemWithScore<App.DTOs.IndexedTrackDTO>
> {}
