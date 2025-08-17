import { EntityId } from '../../common/types/entity-id.type';
import { AlbumTypes } from './constants/album-types';

export type AlbumId = EntityId<'Album'>;

export type AlbumTypeLabel = keyof typeof AlbumTypes;

export type AlbumType = (typeof AlbumTypes)[AlbumTypeLabel];
