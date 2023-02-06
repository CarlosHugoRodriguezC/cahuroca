import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../item/entities/item.entity';
import { ItemService } from '../item/item.service';
import { OrderItem } from '../order-item/entities/order-item.entity';
import { OrderItemService } from '../order-item/order-item.service';
import { Order } from '../order/entities/order.entity';
import { OrderService } from '../order/order.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import {
  SEED_ITEMS,
  SEED_ORDERS,
  SEED_ORDER_ITEMS,
  SEED_USERS,
} from './data/seed.data';

@Injectable()
export class SeedService {
  constructor(
    private readonly usersService: UsersService,
    private readonly orderItemService: OrderItemService,
    private readonly itemService: ItemService,
    private readonly orderService: OrderService,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async runSeed(): Promise<Boolean> {
    // TODO: CLEAR DATABASE
    await this.clearDatabase();
    // TODO: Insert Users
    const user = await this.loadUsers();
    // TODO: Insert Items
    const items = await this.loadItems(user);
    // TODO: Insert Orders
    const orders = await this.loadOrders(user);
    // TODO: Insert OrderItems
    const orderItems = await this.loadOrderItems(
      orders.at(0).id,
      items.at(0).id,
      user,
    );

    return true;
  }

  private async clearDatabase() {
    // TODO: Clear orderItems
    await this.orderItemRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
    // TODO: Clear order
    await this.orderRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
    // TODO: Clear items
    await this.itemRepository.createQueryBuilder().delete().where({}).execute();
    // TODO: Clear users
    await this.userRepository.createQueryBuilder().delete().where({}).execute();
  }

  private async loadUsers(): Promise<User> {
    const usersPromises = SEED_USERS.map((user) =>
      this.usersService.create(user),
    );

    const response = await Promise.all(usersPromises);

    return response.at(0);
  }

  private async loadItems(user: User): Promise<Item[]> {
    const itemsPromises = SEED_ITEMS.map((item) =>
      this.itemService.create(item, user),
    );

    const response = await Promise.all(itemsPromises);

    return response;
  }

  private async loadOrders(user: User): Promise<Order[]> {
    const orderPromises = SEED_ORDERS.map((order) =>
      this.orderService.create(order, user),
    );

    const response = await Promise.all(orderPromises);

    return response;
  }

  private async loadOrderItems(
    orderId: string,
    itemId: string,
    user: User,
  ): Promise<OrderItem[]> {
    const orderItemsPromises = SEED_ORDER_ITEMS.map((orderItem) =>
      this.orderItemService.create({ ...orderItem, orderId, itemId }, user),
    );

    const response = await Promise.all(orderItemsPromises);

    return response;
  }
}
