import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { LabelValueRO } from '../../../../common/ros/label-value.ro';
import { AdminDTO } from '../../../../../../core/app/components/admin/dtos/admin.dto';
import { getAdminRoleLabelByValue } from '../../../../../../core/domain/components/admin/constants/admin-roles';

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

  constructor(dto: AdminDTO) {
    this.id = dto.id;
    this.username = dto.username;
    this.name = dto.name;
    this.role = new LabelValueRO(dto.role, getAdminRoleLabelByValue(dto.role) || 'Label');
    this.isBlocked = dto.isBlocked;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
  }
}
