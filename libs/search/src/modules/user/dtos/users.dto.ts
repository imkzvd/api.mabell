import { App, Shared } from '@api.mabell/core';
import { ItemWithScore } from '../../../types';

export class UsersDTO extends Shared.DTOs.OffsetLimitPaginationResponseDTO<
  ItemWithScore<App.DTOs.IndexedUserDTO>
> {}
