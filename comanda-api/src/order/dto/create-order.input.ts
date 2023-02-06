import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';
import { ValidOrderStatus } from '../enums/valid-order-status.enum';

@InputType()
export class CreateOrderInput {
  @Field(() => Number)
  @IsNumber()
  @IsPositive()
  table: number;

  @Field(() => ValidOrderStatus, { defaultValue: ValidOrderStatus.pending })
  @IsString()
  @IsEnum(ValidOrderStatus)
  status: string;
}
