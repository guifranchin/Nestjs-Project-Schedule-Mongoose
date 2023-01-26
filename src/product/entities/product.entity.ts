import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProductSchema = HydratedDocument<Product>;

@Schema({ collection: 'products' })
export class Product {
  @ApiProperty({ example: '29102648' })
  @Prop({
    required: true,
    unique: true,
  })
  code: number;

  @ApiProperty({ example: 'published' })
  @Prop({
    required: true,
    enum: ['published', 'trash', 'draft'],
  })
  status: string;

  @ApiProperty({ example: new Date() })
  @Prop({ required: true })
  imported_t: Date;

  @ApiProperty({ example: 'https://openfoodfacts.org/product/29102648' })
  @Prop({ required: true })
  url: string;

  @ApiProperty({ example: 'JohnDoe' })
  @Prop()
  creator: string;

  @ApiProperty({ example: 1614272000 })
  @Prop()
  created_t: number;

  @ApiProperty({ example: 1614272000 })
  @Prop()
  last_modified_t: number;

  @ApiProperty({ example: 'Product Name' })
  @Prop()
  product_name: string;

  @ApiProperty({ example: '1kg' })
  @Prop()
  quantity: string;

  @ApiProperty({ example: 'Brand Name' })
  @Prop()
  brands: string;

  @ApiProperty({ example: 'Category Name' })
  @Prop()
  categories: string;

  @ApiProperty({ example: 'Label Name' })
  @Prop()
  labels: string;

  @ApiProperty({ example: 'City Name' })
  @Prop()
  cities: string;

  @ApiProperty({ example: 'Place Name' })
  @Prop()
  purchase_places: string;

  @ApiProperty({ example: 'Store Name' })
  @Prop()
  stores: string;

  @ApiProperty({ example: 'ingredient1, ingredient2' })
  @Prop()
  ingredients_text: string;

  @ApiProperty({ example: 'trace1, trace2' })
  @Prop()
  traces: string;

  @ApiProperty({ example: '100g' })
  @Prop()
  serving_size: string;

  @ApiProperty({ example: 100 })
  @Prop()
  serving_quantity: number;

  @ApiProperty({ example: 3 })
  @Prop()
  nutriscore_score: number;

  @ApiProperty({ example: 'C' })
  @Prop()
  nutriscore_grade: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @Prop()
  image_url: string;

  @ApiProperty({ example: 'https://example.com/image_small.jpg' })
  @Prop()
  image_small_url: string;

  @ApiProperty({})
  @Prop()
  main_category: string;

  @ApiProperty({ example: 100 })
  @Prop()
  energy_100g: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
