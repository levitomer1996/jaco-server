import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.schemna';
import { Product } from '../product/product.schema';
import { Cart } from './cart.schema';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('/addtocart')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  addToCart(@GetUser() user: User, @Body() prod) {
    return this.cartService.addToCart(user, prod.id);
  }

  @Get('/getcart')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  getCart(@GetUser() user): Promise<Cart> {
    return this.cartService.getCart(user);
  }
}
