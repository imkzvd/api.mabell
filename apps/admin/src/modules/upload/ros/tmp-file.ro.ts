import * as process from 'node:process';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { TmpFileDTO } from '@core/app/common/ports/file-storages/common/dtos/tmp-file.dto';

export class TmpFileRO {
  @ApiProperty({
    description: 'Id',
  })
  id: string;

  @ApiProperty({
    example: faker.system.commonFileName('mp3'),
    description: 'Name',
  })
  name: string;

  @ApiProperty({
    description: 'Original name',
    example: faker.system.commonFileName('mp3'),
  })
  originalName: string;

  @ApiProperty({
    description: 'URL',
    example: `/tmp/${faker.system.commonFileName('mp3')}`,
  })
  fullPath: string;

  @ApiProperty({
    description: 'URL',
    example: `${process.env.API_URL}/${faker.system.commonFileName('mp3')}`,
  })
  path: string;

  @ApiProperty({ description: 'Size', example: 10000 })
  size: number;

  @ApiProperty({ description: 'Type', example: faker.system.mimeType() })
  type: string;

  @ApiProperty({ description: 'Date', example: faker.date.past() })
  uploadedAt: Date;

  @ApiProperty({ description: 'Expires Date', example: faker.date.past() })
  expiresAt: Date;

  constructor(dto: TmpFileDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.originalName = dto.originalName;
    this.fullPath = dto.fullPath;
    this.path = `${process.env.API_URL}/${dto.path}`;
    this.size = dto.size;
    this.type = dto.type;
    this.uploadedAt = dto.uploadedAt;
    this.expiresAt = dto.expiresAt;
  }
}
