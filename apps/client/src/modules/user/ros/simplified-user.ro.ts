import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { App } from '@api.mabell/core';

export class SimplifiedUserRO {
  @ApiProperty({ type: String, description: 'Id', example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ type: String, description: 'Birth name', example: faker.person.firstName() })
  name: string;

  constructor(dto: App.DTOs.SimplifiedUserDTO) {
    this.id = dto.id;
    this.name = dto.name;
  }
}
