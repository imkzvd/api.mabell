import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IndexedSimplifiedUserDTO } from '@core/app/common/ports/search-service/dtos/indexed-simplified-user.dto';

export class IndexedSimplifiedUserRO {
  @ApiProperty({ description: 'Id', example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ description: 'Name', example: faker.person.firstName() })
  name: string;

  constructor(dto: IndexedSimplifiedUserDTO) {
    this.id = dto.id;
    this.name = dto.name;
  }
}
