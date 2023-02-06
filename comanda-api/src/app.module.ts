import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { User } from './users/entities/user.entity';
import { JwtPayload } from './auth/interfaces';
import { OrderModule } from './order/order.module';
import { CommonModule } from './common/common.module';
import { ItemModule } from './item/item.module';
import { OrderItemModule } from './order-item/order-item.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   playground: false,
    //   plugins: [ApolloServerPluginLandingPageLocalDefault],
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthModule, UsersModule],
      inject: [JwtService, UsersService],
      useFactory: async (
        jwtService: JwtService,
        usersService: UsersService,
      ) => {
        return {
          playground: false,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          plugins: [ApolloServerPluginLandingPageLocalDefault],
          introspection: true,
          async context({ req }) {
            const token = req.headers.authorization
              ?.replace('Bearer ', '')
              .trim();
            if (!token) throw new UnauthorizedException('Tonken needed');
            const payload: JwtPayload = jwtService.decode(token) as JwtPayload;
            if (!payload) throw new UnauthorizedException('Token not valid');
            // console.log(payload);
            let user: User = null;
            try {
              user = await usersService.findOne(payload.uid);
              // console.log(user);
            } catch (error) {
              console.log(error);
              throw new UnauthorizedException('Token not valid');
            }
          },
        };
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    CommonModule,
    UsersModule,
    AuthModule,
    OrderModule,
    ItemModule,
    OrderItemModule,
    SeedModule,

  ],
})
export class AppModule {}
