import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { App } from '@api.mabell/core';

export class SimplifiedArtistRO {
  @ApiProperty({
    type: String,
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Name',
    example: faker.person.firstName(),
  })
  name: string;

  @ApiProperty({ type: Boolean, description: 'Activation', example: true })
  isActive: boolean;

  constructor(dto: App.DTOs.SimplifiedArtistDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.isActive = dto.isActive;
  }
}
