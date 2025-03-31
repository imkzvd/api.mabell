import { ApiProperty } from '@nestjs/swagger';
import { getRegionLabelByValue, Regions } from '../../../../core/domain/common/constants/regions';

export class LabelValueRO {
  @ApiProperty({
    type: String,
    description: 'Value',
    example: Regions['Russian Federation'],
  })
  value: string;

  @ApiProperty({
    type: String,
    description: 'Label',
    example: getRegionLabelByValue(Regions['Russian Federation']),
  })
  label: string;

  constructor(value: string, label: string) {
    this.value = value;
    this.label = label;
  }
}
