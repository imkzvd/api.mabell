import { Prop } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';

export abstract class BasePersonSchema extends BaseSchema {
  @Prop({ required: true, type: String, unique: true })
  public readonly username: string;

  @Prop({ required: true, type: String })
  public readonly password: string;

  @Prop({ required: true, type: String })
  public readonly name: string;

  @Prop({ required: false, type: Boolean, default: false })
  public readonly isBlocked: boolean;
}
