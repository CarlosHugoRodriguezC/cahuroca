import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { Repository } from 'typeorm';
import { PaginationArgs, SearchArgs } from '../common/dto/args';
import { User } from '../users/entities/user.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { ValidOrderStatus } from './enums/valid-order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderInput: CreateOrderInput, user: User): Promise<Order> {
    const order = this.orderRepository.create({
      ...createOrderInput,
      createdBy: user,
      updatedBy: user,
    });

    try {
      await this.orderRepository.save(order);

      return order;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll(
    paginationArgs: PaginationArgs,
    // searchArgs: SearchArgs,
    user: User,
  ): Promise<Order[]> {
    const { limit, offset } = paginationArgs;
    // const { search } = searchArgs;

    const { id: userId } = user;

    const queryBuilder = this.orderRepository
      .createQueryBuilder()
      .skip(offset)
      .limit(limit)
      .where(` "createdById" = :userId `, { userId });

    return await queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id });

    if (!order) throw new NotFoundException(`Order with id ${id} not found.`);

    return order;
  }

  async update(
    id: string,
    updateOrderInput: UpdateOrderInput,
    user: User,
  ): Promise<Order> {
    const order = await this.findOne(id);

    const orderToUpdate = await this.orderRepository.preload({
      ...updateOrderInput,
      updatedBy: user,
    });

    try {
      await this.orderRepository.save(orderToUpdate);
      return orderToUpdate;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async remove(id: string, user: User): Promise<Order> {
    try {
      const order = await this.update(
        id,
        { id, status: ValidOrderStatus.archived },
        user,
      );
      return order;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  private handleErrors(error) {
    console.log(error);

    throw new InternalServerErrorException(
      'Something went wrong. Check server logs.',
    );
  }
}
