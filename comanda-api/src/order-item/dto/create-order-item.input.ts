import { InputType, Int, Field, ID } from '@nestjs/graphql';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { ValidOrderItemStatus } from '../enums/valid-order-item-status.enum';

@InputType()
export class CreateOrderItemInput {
  @Field(() => Int)
  @IsNumber()
  @IsPositive()
  @IsInt()
  quantity: number;

  @Field(() => ValidOrderItemStatus)
  @IsString()
  @IsEnum(ValidOrderItemStatus)
  status: string;

  @Field(() => ID)
  @IsUUID()
  itemId: string;

  @Field(() => ID)
  @IsUUID()
  orderId: string;
}
