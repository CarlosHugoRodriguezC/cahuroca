import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '../../item/entities/item.entity';
import { Order } from '../../order/entities/order.entity';
import { User } from '../../users/entities/user.entity';
import { ValidOrderItemStatus } from '../enums/valid-order-item-status.enum';

@Entity({ name: 'orderItems' })
@ObjectType()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => Int)
  quantity: number;

  @Column()
  @Field(() => ValidOrderItemStatus)
  status: string;

  @ManyToOne(() => Item, (item) => item.orderItems, { lazy: true })
  @Field(() => Item)
  item: Item;

  @ManyToOne(() => Order, (order) => order.orderItems, { lazy: true })
  @Field(() => Order)
  order: Order;

  @Column('timestamptz')
  @Field(() => Date)
  createdAt: Date;

  @Column('timestamptz')
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.itemsCreated, { lazy: true })
  @Field(() => User)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.itemsUpdated, { lazy: true })
  @Field(() => User)
  updatedBy: User;

  @BeforeInsert()
  registerTimeStamps() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  updateTimeStamps() {
    this.updatedAt = new Date();
  }
}
