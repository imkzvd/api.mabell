import * as process from 'process';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { App } from '@api.mabell/core';
import { IndexedSimplifiedArtistRO } from './indexed-simplified-artist.ro';

export class IndexedAlbumRO {
  @ApiProperty({ description: 'Id', example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ description: 'Name', example: faker.person.firstName() })
  name: string;

  @ApiProperty({
    description: 'Artists of the album',
    type: () => [IndexedSimplifiedArtistRO],
  })
  artists: IndexedSimplifiedArtistRO[];

  @ApiProperty({
    type: String,
    description: 'Cover',
    example: faker.image.url(),
    nullable: true,
  })
  cover: string | null;

  constructor(dto: App.DTOs.IndexedAlbumDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.artists = dto.artists.map((i) => new IndexedSimplifiedArtistRO(i));
    this.cover = dto.cover ? `${process.env.API_URL}${dto.cover}` : null;
  }
}
