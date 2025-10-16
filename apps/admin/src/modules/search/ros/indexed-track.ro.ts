import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { App } from '@api.mabell/core';
import { IndexedSimplifiedArtistRO } from './indexed-simplified-artist.ro';
import { IndexedSimplifiedAlbumRO } from './indexed-simplified-album.ro';

export class IndexedTrackRO {
  @ApiProperty({ description: 'Id', example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ description: 'Name', example: faker.person.firstName() })
  name: string;

  @ApiProperty({
    description: 'Artists of the album',
    example: IndexedSimplifiedAlbumRO,
    type: () => IndexedSimplifiedAlbumRO,
  })
  album: IndexedSimplifiedAlbumRO;

  @ApiProperty({
    description: 'Featured artists',
    example: [IndexedSimplifiedArtistRO],
    type: () => [IndexedSimplifiedArtistRO],
  })
  artists: IndexedSimplifiedArtistRO[];

  @ApiProperty({
    description: 'Featured artists',
    example: [IndexedSimplifiedArtistRO],
    type: () => [IndexedSimplifiedArtistRO],
  })
  featArtists: IndexedSimplifiedArtistRO[];

  @ApiProperty({
    type: String,
    description: 'Cover',
    example: faker.image.url(),
    nullable: true,
  })
  cover: string | null;

  @ApiProperty({ type: String, description: 'Type' })
  type: string;

  constructor(dto: App.DTOs.IndexedTrackDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.album = new IndexedSimplifiedAlbumRO(dto.album);
    this.artists = dto.artists.map((i) => new IndexedSimplifiedArtistRO(i));
    this.featArtists = dto.featArtists.map((i) => new IndexedSimplifiedArtistRO(i));
    this.cover = dto.cover ? `${process.env.API_URL}${dto.cover}` : null;
    this.type = 'track';
  }
}
