import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGqlGuard } from '../auth/guards/jwt-auth-gql.guard';
import { CurrentUserGql } from '../auth/decorators/current-user-gql.decorator';
import { User } from '../users/entities/user.entity';
import { PaginationArgs } from '../common/dto/args';

@Resolver(() => Item)
@UseGuards(JwtAuthGqlGuard)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Mutation(() => Item)
  createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
    @CurrentUserGql() user: User,
  ): Promise<Item> {
    return this.itemService.create(createItemInput, user);
  }

  @Query(() => [Item], { name: 'items' })
  findAll(
    @Args() paginationArgs: PaginationArgs,
    @CurrentUserGql() user: User,
  ): Promise<Item[]> {
    return this.itemService.findAll(paginationArgs, user);
  }

  @Query(() => Item, { name: 'item' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUserGql() user: User,
  ): Promise<Item> {
    return this.itemService.findOne(id);
  }

  @Mutation(() => Item)
  updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
    @CurrentUserGql() user: User,
  ): Promise<Item> {
    return this.itemService.update(updateItemInput.id, updateItemInput, user);
  }

  @Mutation(() => Item)
  removeItem(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUserGql() user: User,
  ): Promise<Item> {
    return this.itemService.remove(id, user);
  }
}
