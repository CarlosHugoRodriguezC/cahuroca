import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { OrderItemService } from './order-item.service';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderItemInput } from './dto/create-order-item.input';
import { UpdateOrderItemInput } from './dto/update-order-item.input';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGqlGuard } from '../auth/guards/jwt-auth-gql.guard';
import { CurrentUserGql } from '../auth/decorators/current-user-gql.decorator';
import { User } from '../users/entities/user.entity';
import { PaginationArgs } from '../common/dto/args';

@Resolver(() => OrderItem)
@UseGuards(JwtAuthGqlGuard)
export class OrderItemResolver {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Mutation(() => OrderItem)
  createOrderItem(
    @Args('createOrderItemInput') createOrderItemInput: CreateOrderItemInput,
    @CurrentUserGql() user: User,
  ): Promise<OrderItem> {
    return this.orderItemService.create(createOrderItemInput, user);
  }

  @Query(() => [OrderItem], { name: 'orderItem' })
  findAll(
    @Args() paginationArgs: PaginationArgs,
    @CurrentUserGql() user: User,
  ): Promise<OrderItem[]> {
    return this.orderItemService.findAll(paginationArgs, user);
  }

  @Query(() => OrderItem, { name: 'orderItem' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<OrderItem> {
    return this.orderItemService.findOne(id);
  }

  @Mutation(() => OrderItem)
  updateOrderItem(
    @Args('updateOrderItemInput') updateOrderItemInput: UpdateOrderItemInput,
    @CurrentUserGql() user: User,
  ) {
    return this.orderItemService.update(
      updateOrderItemInput.id,
      updateOrderItemInput,
      user,
    );
  }

  @Mutation(() => OrderItem)
  removeOrderItem(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUserGql() user: User,
  ) {
    return this.orderItemService.remove(id, user);
  }
}
