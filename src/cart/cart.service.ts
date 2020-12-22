import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/user.schemna';
import { Product } from '../product/product.schema';
import { Cart } from './cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async addToCart(user: User, prod: string): Promise<Product> {
    const foundProduct = await this.productModel.findById(prod).exec();
    const foundCart = await this.cartModel.findOne({ user: user }).exec();
    if (!foundCart) {
      const newCart = new this.cartModel({
        user: user,
        products: [foundProduct],
      });

      await newCart.save();
    }

    if (foundCart.products.includes(foundProduct)) {
      console.log('Already Here');
      throw new BadRequestException('Product is already inside');
    }

    try {
      await this.cartModel.findOneAndUpdate(
        { user: user },
        { products: [...foundCart.products, foundProduct] },
      );
    } catch (error) {
      console.log(error);
    }
    return foundProduct;
  }

  async getCart(user: User): Promise<Cart> {
    const cart = this.cartModel.findOne({ user });
    if (!cart) {
      throw new BadRequestException('Cart is empty');
    }
    return cart;
  }
}
