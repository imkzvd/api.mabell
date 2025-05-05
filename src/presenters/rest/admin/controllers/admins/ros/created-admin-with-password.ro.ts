import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { AdminRO } from './admin.ro';
import { AdminDTO } from '../../../../../../core/app/components/admin/queries/dtos/admin.dto';

export class CreatedAdminWithPasswordRO {
  @ApiProperty({
    type: () => AdminRO,
    description: 'Created Admin',
  })
  readonly admin: AdminRO;

  @ApiProperty({
    type: String,
    description: 'Password',
    example: faker.internet.password(),
  })
  readonly password: string;

  constructor(admin: AdminDTO, password: string) {
    this.admin = new AdminRO(admin);
    this.password = password;
  }
}
