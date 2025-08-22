import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { LabelValueRO } from '@api.mabell/shared';
import { App } from '@api.mabell/core';

export class LoggedAdminProfileRO {
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

  @ApiProperty({ type: () => LabelValueRO, description: 'Role' })
  role: LabelValueRO;

  constructor(dto: App.DTOs.AdminDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.role = new LabelValueRO(dto.roleLabelValue);
  }
}
