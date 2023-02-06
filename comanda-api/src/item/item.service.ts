import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationArgs } from '../common/dto/args';
import { User } from '../users/entities/user.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Item } from './entities/item.entity';
import { ValidItemStatus } from './enums/valid-item-status.enum';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemInput: CreateItemInput, user: User): Promise<Item> {
    const item = this.itemRepository.create({
      ...createItemInput,
      updatedBy: user,
      createdBy: user,
    });

    try {
      return await this.itemRepository.save(item);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll(paginationArgs: PaginationArgs, user: User): Promise<Item[]> {
    const { limit, offset } = paginationArgs;

    const queryBuilder = this.itemRepository
      .createQueryBuilder()
      .limit(limit)
      .skip(offset);

    return await queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemRepository.findOneBy({ id });

    if (!item) throw new NotFoundException(`Item with id ${id} not found`);

    return item;
  }

  async update(
    id: string,
    updateItemInput: UpdateItemInput,
    user: User,
  ): Promise<Item> {
    await this.findOne(id);

    const item = await this.itemRepository.preload({
      ...updateItemInput,
      updatedBy: user,
    });

    try {
      return await this.itemRepository.save(item);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async remove(id: string, user: User): Promise<Item> {
    await this.findOne(id);

    const item = await this.itemRepository.preload({
      id,
      status: ValidItemStatus.archived,
      updatedBy: user,
    });

    try {
      return await this.itemRepository.save(item);
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
