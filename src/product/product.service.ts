import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewProductDTO } from './DTO/NewProduct.dto';
import { ProductType } from './DTO/ProductType.enum';
import { Product } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    const prodList = await this.productModel.find({});
    return prodList;
  }

  async newProduct(newProd: NewProductDTO) {
    const newP = new this.productModel({
      name: newProd.name,
      img: newProd.img,
      description: newProd.description,
      price: newProd.price,
      ammount_stock: newProd.ammount_stock,
      productType: newProd.productType,
      manufacturer: newProd.manufacturer,
    });

    const res = await newP.save();

    return res;
  }

  async getProdsByCategory(category: ProductType): Promise<Product[]> {
    const list = await this.productModel.find({ productType: category }).exec();
    console.log(list);
    return list;
  }
}
