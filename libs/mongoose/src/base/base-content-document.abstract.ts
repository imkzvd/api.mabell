import { Prop } from '@nestjs/mongoose';
import { BaseDocument } from './base-document.abstract';

export abstract class BaseContentDocument extends BaseDocument {
  @Prop({ required: true, type: String })
  public readonly name: string;

  @Prop({ required: false, type: Boolean, default: false })
  public readonly isPublic: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  public readonly isActive: boolean;
}
