import { IsIn } from 'class-validator';
import { ProductType } from './ProductType.enum';

export class NewProductDTO {
  name: string;
  img: string;
  description: string;
  price: number;
  ammount_stock: number;
  @IsIn([ProductType])
  productType: ProductType;
  manufacturer: string;
}
