import { Schema } from '@nestjs/mongoose/dist/decorators/schema.decorator';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Domain } from '@api.mabell/core';
import { BasePersonSchema } from '../../base/base-person.schema';

@Schema({ versionKey: false, timestamps: true })
export class Admin extends BasePersonSchema {
  @Prop({
    required: false,
    type: String,
    enum: Domain.Admin.AdminRoles,
    default: Domain.Admin.AdminRoles.Guest,
  })
  public readonly role: Domain.Admin.AdminRole;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
