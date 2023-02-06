import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemResolver } from './order-item.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  providers: [OrderItemResolver, OrderItemService],
  exports: [TypeOrmModule, OrderItemService],
})
export class OrderItemModule {}
