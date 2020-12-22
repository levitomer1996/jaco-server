import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NewProductDTO } from './DTO/NewProduct.dto';
import { ProductType } from './DTO/ProductType.enum';
import { Product } from './product.schema';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private prodService: ProductService) {}
  @Get('/getprods')
  getAllProducts(): Promise<Product[]> {
    return this.prodService.getAllProducts();
  }

  @Get('/getbycategory/:cate')
  getProdsByCategory(@Param('cate') category): Promise<Product[]> {
    console.log(category);
    return this.prodService.getProdsByCategory(category);
  }
  @Post('/newprod')
  newProduct(@Body() newProd: NewProductDTO) {
    console.log(newProd);
    return this.prodService.newProduct(newProd);
  }

  @Get(':imgpath')
  getImage(@Res() res, @Param('imgpath') img) {
    return res.sendFile(img, { root: 'uploads' });
  }
}
