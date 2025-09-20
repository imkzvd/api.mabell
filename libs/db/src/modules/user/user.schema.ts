import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema } from '@nestjs/mongoose/dist/decorators/schema.decorator';
import { Domain } from '@api.mabell/core';
import { BasePersonSchema } from '../../base/base-person.schema';

@Schema({ versionKey: false, timestamps: true })
export class User extends BasePersonSchema {
  @Prop({ required: false, type: String, default: null, index: 1 })
  email: string | null;

  @Prop({ required: false, type: Date, default: null })
  birthDate: Date | null;

  @Prop({
    required: false,
    type: String,
    enum: Domain.Common.Regions,
    default: Domain.Common.Regions['Russian Federation'],
  })
  region: Domain.Common.Region;

  @Prop({ required: false, type: [{ type: String, enum: Domain.Common.Genres }] })
  genres: Domain.Common.Genre[];

  @Prop({ required: false, type: String, default: null })
  avatar: string | null;

  @Prop({ required: false, type: String, default: null })
  color: string | null;

  @Prop({ required: false, type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  isPremium: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  isPublic: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
