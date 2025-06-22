import { Prop } from '@nestjs/mongoose';
import { BaseDocument } from './base-document.abstract';

export abstract class BasePersonDocument extends BaseDocument {
  @Prop({ required: true, type: String, unique: true })
  public readonly username: string;

  @Prop({ required: true, type: String })
  public readonly password: string;

  @Prop({ required: true, type: String })
  public readonly name: string;

  @Prop({ required: false, type: Boolean, default: false })
  public readonly isBlocked: boolean;
}
