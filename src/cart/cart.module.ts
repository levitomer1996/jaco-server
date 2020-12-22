import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/jwt-strategy';
import { User, UserSchema } from '../auth/user.schemna';
import { ProductModule } from '../product/product.module';
import { Product, ProductSchema } from '../product/product.schema';
import { CartController } from './cart.controller';
import { Cart, CartSchema } from './cart.schema';
import { CartService } from './cart.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AuthModule,
    ProductModule,
    JwtModule.register({
      secret: 'tomer',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [CartController],
  providers: [CartService, JwtStrategy],
})
export class CartModule {}
