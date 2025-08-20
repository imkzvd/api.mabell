import * as process from 'process';
import { Schema, Types } from 'mongoose';
import { Schema as SchemaDecorator } from '@nestjs/mongoose/dist/decorators/schema.decorator';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

@SchemaDecorator({
  versionKey: false,
  timestamps: { updatedAt: false },
  collection: 'user-refresh-tokens',
})
export class UserRefreshToken {
  @Prop({ required: true, type: Schema.Types.ObjectId })
  public readonly _id: Types.ObjectId;

  @Prop({ required: true, type: String, index: true })
  public readonly owner: string;

  @Prop({ required: true, type: String })
  public readonly ip: string;

  @Prop({ required: true, type: String })
  public readonly userAgent: string;

  @Prop({
    required: false,
    type: Date,
    default: Date.now(),
    expires: process.env.REFRESH_TOKEN_EXPIRATION
      ? parseInt(process.env.REFRESH_TOKEN_EXPIRATION)
      : 86400,
  })
  public readonly createdAt: Date;
}

export const UserRefreshTokenSchema = SchemaFactory.createForClass(UserRefreshToken);
