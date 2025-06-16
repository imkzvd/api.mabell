import { Schema, Types } from 'mongoose';
import { Schema as SchemaDecorator } from '@nestjs/mongoose/dist/decorators/schema.decorator';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

@SchemaDecorator({
  versionKey: false,
  timestamps: { updatedAt: false },
  collection: 'refresh-tokens',
})
export class RefreshToken {
  @Prop({ required: true, type: Schema.Types.ObjectId })
  public readonly _id: Types.ObjectId;

  @Prop({ required: true, type: String })
  public readonly owner: string;

  @Prop({ required: true, type: String })
  public readonly ip: string;

  @Prop({ required: true, type: String })
  public readonly userAgent: string;

  @Prop({ required: false, type: Date, default: () => new Date() })
  public readonly createdAt: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
