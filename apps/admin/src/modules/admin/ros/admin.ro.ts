import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { App } from '@api.mabell/core';
import { LabelValueRO } from '@api.mabell/shared';

export class AdminRO {
  @ApiProperty({
    type: String,
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Username',
    example: faker.internet.username(),
  })
  username: string;

  @ApiProperty({
    type: String,
    description: 'Name',
    example: faker.person.firstName(),
  })
  name: string;

  @ApiProperty({ type: () => LabelValueRO, description: 'Role' })
  role: LabelValueRO;

  @ApiProperty({ type: Boolean, description: 'Block' })
  isBlocked: boolean;

  @ApiProperty({
    type: Date,
    description: 'Reg. date',
    example: faker.date.anytime(),
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Update date',
    example: faker.date.anytime(),
  })
  updatedAt: Date;

  constructor(dto: App.DTOs.AdminDTO) {
    this.id = dto.id;
    this.username = dto.username;
    this.name = dto.name;
    this.role = new LabelValueRO(dto.roleLabelValue);
    this.isBlocked = dto.isBlocked;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
  }
}
