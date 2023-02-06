import { InputType, Int, Field, Float } from '@nestjs/graphql';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ValidItemStatus } from '../enums/valid-item-status.enum';

@InputType()
export class CreateItemInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  price: number;

  @Field(() => ValidItemStatus)
  @IsString()
  @IsEnum(ValidItemStatus)
  status: string;
}
