import { App, Shared } from '@api.mabell/core';
import { ItemWithScore } from '../../../types';

export class PlaylistsDTO extends Shared.DTOs.OffsetLimitPaginationResponseDTO<
  ItemWithScore<App.DTOs.IndexedPlaylistDTO>
> {}
