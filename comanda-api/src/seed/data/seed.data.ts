import { ValidRoles } from '../../auth/enums/valid-roles.enum';
import { CreateItemInput } from '../../item/dto/create-item.input';
import { ValidItemStatus } from '../../item/enums/valid-item-status.enum';
import { CreateOrderItemInput } from '../../order-item/dto/create-order-item.input';
import { ValidOrderItemStatus } from '../../order-item/enums/valid-order-item-status.enum';
import { CreateOrderInput } from '../../order/dto/create-order.input';
import { ValidOrderStatus } from '../../order/enums/valid-order-status.enum';
import { CreateUserInput } from '../../users/dto/create-user.input';

export const SEED_USERS: CreateUserInput[] = [
  {
    email: 'cahuroca.aw@gmail.com',
    firstName: 'Carlos Hugo',
    lastName: 'Rodriguez Calderon',
    password: 'pass_good',
    roles: [ValidRoles.admin],
  },
  {
    email: 'employee@test.com',
    firstName: 'Jhon (Employee)',
    lastName: 'Doe',
    password: 'pass_good',
    roles: [ValidRoles.employee],
  },
];

export const SEED_ITEMS: CreateItemInput[] = [
  {
    name: 'Taco de pastor',
    price: 11.0,
    status: ValidItemStatus.inStock,
  },
  {
    name: 'Cerveza modelo de lata',
    price: 20.0,
    status: ValidItemStatus.inStock,
  },
];

export const SEED_ORDERS: CreateOrderInput[] = [
  {
    status: ValidOrderStatus.pending,
    table: 1,
  },
  {
    status: ValidOrderStatus.pending,
    table: 2,
  },
];

export const SEED_ORDER_ITEMS: CreateOrderItemInput[] = [
  {
    itemId: '',
    orderId: '',
    status: ValidOrderItemStatus.active,
    quantity: 5,
  },
  {
    itemId: '',
    orderId: '',
    status: ValidOrderItemStatus.active,
    quantity: 5,
  },
  {
    itemId: '',
    orderId: '',
    status: ValidOrderItemStatus.active,
    quantity: 2,
  },
];
