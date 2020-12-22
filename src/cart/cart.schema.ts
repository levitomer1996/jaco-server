import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../auth/user.schemna';
import { Product } from '../product/product.schema';

@Schema()
export class Cart extends Document {
  @Prop({ required: true })
  user: User;
  @Prop({ required: true })
  products: Product[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
