import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { LabelValueRO } from '../../../../common/ros/label-value.ro';
import { getAdminRoleLabelByValue } from '../../../../../../core/domain/components/admin/constants/admin-roles';
import { AdminDTO } from '../../../../../../core/app/components/admin/dtos/admin.dto';

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

  constructor(dto: AdminDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.role = new LabelValueRO(dto.role, getAdminRoleLabelByValue(dto.role) || 'Label');
  }
}
