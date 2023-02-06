import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
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
import { ValidItemStatus } from '../enums/valid-item-status.enum';

@Entity({ name: 'items' })
@ObjectType()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  description?: string;

  @Column('float')
  @Field(() => Float)
  price: number;

  @Column()
  @Field(() => ValidItemStatus)
  status: string;

  @Column('timestamptz')
  @Field(() => Date)
  createdAt: Date;

  @Column('timestamptz')
  @Field(() => Date)
  updatedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.item, { lazy: true })
  @Field(() => OrderItem)
  orderItems: OrderItem[];

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
