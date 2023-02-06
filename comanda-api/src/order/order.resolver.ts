import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { OrderService } from './order.service';
import { JwtAuthGqlGuard } from '../auth/guards/jwt-auth-gql.guard';
import { CurrentUserGql } from '../auth/decorators/current-user-gql.decorator';

import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';

import { ValidRoles } from '../auth/enums/valid-roles.enum';
import { PaginationArgs } from '../common/dto/args';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@UseGuards(JwtAuthGqlGuard)
@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @CurrentUserGql() user: User,
  ): Promise<Order> {
    return this.orderService.create(createOrderInput, user);
  }

  @Query(() => [Order], { name: 'orders' })
  findAll(
    @Args() paginationArgs: PaginationArgs,
    @CurrentUserGql() user: User,
  ): Promise<Order[]> {
    return this.orderService.findAll(paginationArgs, user);
  }

  @Query(() => Order, { name: 'order' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Mutation(() => Order)
  updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
    @CurrentUserGql() user:User,
  ): Promise<Order> {
    return this.orderService.update(updateOrderInput.id, updateOrderInput, user);
  }

  @Mutation(() => Order)
  removeOrder(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUserGql([ValidRoles.admin]) user: User
  ): Promise<Order> {
    return this.orderService.remove(id, user);
  }
}
