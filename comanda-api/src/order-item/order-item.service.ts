import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationArgs } from '../common/dto/args';
import { User } from '../users/entities/user.entity';
import { CreateOrderItemInput } from './dto/create-order-item.input';
import { UpdateOrderItemInput } from './dto/update-order-item.input';
import { OrderItem } from './entities/order-item.entity';
import { ValidOrderItemStatus } from './enums/valid-order-item-status.enum';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
  ) {}

  async create(
    createOrderItemInput: CreateOrderItemInput,
    user: User,
  ): Promise<OrderItem> {
    const { itemId, orderId, ...rest } = createOrderItemInput;

    const orderItem = this.orderItemsRepository.create({
      ...rest,
      item: { id: itemId },
      order: { id: orderId },
      createdBy: user,
      updatedBy: user,
    });

    try {
      return await this.orderItemsRepository.save(orderItem);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll(
    paginationArgs: PaginationArgs,
    user: User,
  ): Promise<OrderItem[]> {
    const { limit, offset } = paginationArgs;

    const queryBuilder = this.orderItemsRepository
      .createQueryBuilder()
      .limit(limit)
      .skip(offset)
      .where(`createdById = :userId`, { userId: user.id });

    return await queryBuilder.getMany();
  }

  async findOne(id: string): Promise<OrderItem> {
    const orderItem = await this.orderItemsRepository.findOneBy({ id });
    if (!orderItem)
      throw new NotFoundException(`Order item with ${id} not found.`);

    return orderItem;
  }

  async update(
    id: string,
    updateOrderItemInput: UpdateOrderItemInput,
    user: User,
  ): Promise<OrderItem> {
    await this.findOne(id);

    const orderItem = await this.orderItemsRepository.preload({
      ...updateOrderItemInput,
      updatedBy: user,
    });

    try {
      return await this.orderItemsRepository.save(orderItem);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async remove(id: string, user: User): Promise<OrderItem> {
    await this.findOne(id);
    const orderItem = await this.orderItemsRepository.preload({
      id,
      status: ValidOrderItemStatus.active,
      updatedBy: user,
    });

    try {
      return await this.orderItemsRepository.save(orderItem);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  private handleErrors(error) {
    console.log(error);

    throw new InternalServerErrorException(
      'Something went wrong. Plese check server logs.',
    );
  }
}
