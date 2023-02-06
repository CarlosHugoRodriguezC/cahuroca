import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { UsersModule } from '../users/users.module';
import { ItemModule } from '../item/item.module';
import { OrderModule } from '../order/order.module';
import { OrderItemModule } from '../order-item/order-item.module';

@Module({
  imports: [UsersModule, ItemModule, OrderModule, OrderItemModule],
  providers: [SeedResolver, SeedService]
})
export class SeedModule {}
