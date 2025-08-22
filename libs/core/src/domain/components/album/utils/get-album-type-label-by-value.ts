import { AlbumTypes } from '../constants/album-types';
import { AlbumTypeLabel } from '../types';

export function getAlbumTypeLabelByValue(value: string): AlbumTypeLabel {
  return (Object.keys(AlbumTypes) as AlbumTypeLabel[]).find(
    (key) => AlbumTypes[key] === value,
  ) as AlbumTypeLabel;
}
