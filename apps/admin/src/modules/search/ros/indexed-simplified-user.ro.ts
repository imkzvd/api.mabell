import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { App } from '@api.mabell/core';

export class IndexedSimplifiedUserRO {
  @ApiProperty({ description: 'Id', example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ description: 'Name', example: faker.person.firstName() })
  name: string;

  constructor(dto: App.DTOs.IndexedSimplifiedUserDTO) {
    this.id = dto.id;
    this.name = dto.name;
  }
}
