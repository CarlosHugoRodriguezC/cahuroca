import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from '../../order-item/entities/order-item.entity';
import { User } from '../../users/entities/user.entity';
import { ValidOrderStatus } from '../enums/valid-order-status.enum';

@Entity({ name: 'orders' })
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => Int)
  table: number;

  @Column()
  @Field(() => ValidOrderStatus)
  status: string;

  @Column('timestamptz')
  @Field(() => Date)
  createdAt: Date;

  @Column('timestamptz')
  @Field(() => Date)
  updatedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { lazy: true })
  @Field(() => [OrderItem])
  orderItems: OrderItem[];

  @ManyToOne(() => User, (user) => user.ordersCreated, {
    nullable: false,
    lazy: true,
  })
  @Field(() => User)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.ordersUpdated, {
    nullable: false,
    lazy: true,
  })
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
