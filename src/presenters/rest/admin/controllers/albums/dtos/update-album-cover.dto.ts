import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsHexColor, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAlbumCoverDTO {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Id of the uploaded file',
    example: faker.image.url(),
    nullable: true,
  })
  @IsNotEmpty()
  @IsOptional()
  fileId?: string;

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
