import { Prop } from '@nestjs/mongoose';
import { Schema, Types } from 'mongoose';

export abstract class BaseSchema {
  @Prop({ required: true, type: Schema.Types.ObjectId })
  public readonly _id: Types.ObjectId;

  @Prop({ required: false, type: Date, default: () => new Date() })
  public readonly createdAt: Date;

  @Prop({ required: false, type: Date, default: () => new Date() })
  public readonly updatedAt: Date;
}
