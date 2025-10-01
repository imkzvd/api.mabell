import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { App } from '@api.mabell/core';
import { IndexedSimplifiedArtistRO } from './indexed-simplified-artist.ro';
import { IndexedAlbumRO } from './indexed-album.ro';

export class IndexedTrackRO {
  @ApiProperty({ description: 'Id', example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ description: 'Name', example: faker.person.firstName() })
  name: string;

  @ApiProperty({
    description: 'Artists of the album',
    example: IndexedAlbumRO,
    type: IndexedAlbumRO,
  })
  album: IndexedAlbumRO;

  @ApiProperty({
    description: 'Featured artists',
    example: [IndexedSimplifiedArtistRO],
    type: () => [IndexedSimplifiedArtistRO],
  })
  featArtists: IndexedSimplifiedArtistRO[];

  constructor(dto: App.DTOs.IndexedTrackDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.album = new IndexedAlbumRO(dto.album);
    this.featArtists = dto.featArtists.map((i) => i);
  }
}
