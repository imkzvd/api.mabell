import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { faker } from '@faker-js/faker';
import { Domain } from '@api.mabell/core';

export class UpdateAdminDTO {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Birth Name',
    example: faker.person.firstName(),
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Role',
    example: Domain.Admin.AdminRoles.Guest,
  })
  @IsEnum(Domain.Admin.AdminRoles)
  @IsOptional()
  role?: Domain.Admin.AdminRole;

  @ApiProperty({
    required: false,
    type: Boolean,
    description: 'Block',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isBlocked?: boolean;
}
