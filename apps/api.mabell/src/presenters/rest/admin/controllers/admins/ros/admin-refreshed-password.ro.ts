import { ApiProperty } from '@nestjs/swagger';

export class AdminRefreshedPasswordRO {
  @ApiProperty({
    type: String,
    description: 'Password',
  })
  password: string;

  constructor(value: string) {
    this.password = value;
  }
}
