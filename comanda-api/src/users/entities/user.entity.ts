import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from '../../item/entities/item.entity';
import { Order } from '../../order/entities/order.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  firstName: string;

  @Column()
  @Field(() => String)
  lastName: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column({ type: 'text', array: true, default: ['user'] })
  @Field(() => [String])
  roles: string[];

  @Column()
  @Field(() => Boolean)
  isActive: boolean;

  @Column('timestamptz')
  @Field(() => Date)
  createdAt: Date;

  @Column('timestamptz')
  @Field(() => Date)
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.createdBy, {
    nullable: true,
    lazy: true,
  })
  @Field(() => [Order], { nullable: true })
  ordersCreated: Order[];

  @OneToMany(() => Order, (order) => order.updatedBy, {
    nullable: true,
    lazy: true,
  })
  @Field(() => [Order], { nullable: true })
  ordersUpdated: Order[];

  @OneToMany(() => Item, (item) => item.createdBy, { lazy: true })
  @Field(() => [Item])
  itemsCreated: Item[];

  @OneToMany(() => Item, (item) => item.updatedBy, { lazy: true })
  @Field(() => [Item])
  itemsUpdated: Item[];


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
