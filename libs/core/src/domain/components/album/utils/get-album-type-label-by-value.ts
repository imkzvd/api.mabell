import { AlbumTypes } from '../constants/album-types';
import { AlbumType, AlbumTypeLabel } from '../types';

export function getAlbumTypeLabelByValue(value: AlbumType): AlbumTypeLabel {
  return (Object.keys(AlbumTypes) as AlbumTypeLabel[]).find(
    (key) => AlbumTypes[key] === value,
  ) as AlbumTypeLabel;
}
