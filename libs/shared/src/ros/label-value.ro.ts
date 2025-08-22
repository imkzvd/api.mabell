import { ApiProperty } from '@nestjs/swagger';
import { Shared } from '@api.mabell/core';

export class LabelValueRO {
  @ApiProperty({
    type: String,
    description: 'Value',
    example: 'Hip-Hop',
  })
  value: string | number;

  @ApiProperty({
    type: String,
    description: 'Label',
    example: 'HH',
  })
  label: string;

  constructor(dto: Shared.DTOs.LabelValueDTO) {
    this.label = dto.label;
    this.value = dto.value;
  }
}
