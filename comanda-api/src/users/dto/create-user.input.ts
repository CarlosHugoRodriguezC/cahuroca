import { InputType, Int, Field } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  firstName: string;

  @Field(() => String)
  @IsString()
  lastName: string;

  @Field(() => String)
  @IsString()
  email: string;

  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => [String])
  @IsString({ each: true })
  @IsArray()
  roles: string[];
}
