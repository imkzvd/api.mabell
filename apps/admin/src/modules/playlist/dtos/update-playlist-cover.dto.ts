import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsHexColor, IsOptional } from 'class-validator';

export class UpdatePlaylistCoverDTO {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Id of the uploaded file',
    example: faker.image.url(),
    nullable: true,
  })
  @IsOptional()
  fileId?: string | null;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Color',
    example: faker.color.rgb(),
    nullable: true,
  })
  @IsHexColor()
  @IsOptional()
  color?: string | null;
}
