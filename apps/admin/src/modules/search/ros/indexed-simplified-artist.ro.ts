import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IndexedSimplifiedArtistDTO } from '@core/app/common/ports/search-service/dtos/indexed-simplified-artist.dto';

export class IndexedSimplifiedArtistRO {
  @ApiProperty({ description: 'Id', example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ description: 'Name', example: faker.person.firstName() })
  name: string;

  constructor(dto: IndexedSimplifiedArtistDTO) {
    this.id = dto.id;
    this.name = dto.name;
  }
}
