import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { faker } from '@faker-js/faker';
import { AdminRole, AdminRoles } from '@core/domain/components/admin/constants/admin-roles';

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
    example: AdminRoles.Guest,
  })
  @IsEnum(AdminRoles)
  @IsOptional()
  role?: AdminRole;

  @ApiProperty({
    required: false,
    type: Boolean,
    description: 'BLock',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isBlocked?: boolean;
}
