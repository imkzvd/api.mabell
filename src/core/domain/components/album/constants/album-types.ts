export const AlbumTypes = {
  Album: 'ALBUM',
  Single: 'SINGLE',
  EP: 'EP',
} as const;

export type AlbumTypeLabel = keyof typeof AlbumTypes;

export type AlbumType = (typeof AlbumTypes)[AlbumTypeLabel];

export function getAlbumTypeLabelByValue(value: AlbumType): AlbumTypeLabel {
  return (
    (Object.keys(AlbumTypes) as AlbumTypeLabel[]).find((key) => AlbumTypes[key] === value) ||
    'Album'
  );
}
