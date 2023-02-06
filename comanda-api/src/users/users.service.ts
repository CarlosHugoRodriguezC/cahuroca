import * as bcrypt from 'bcryptjs';

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      const user = await this.usersRepository.create({
        ...createUserInput,
        password: bcrypt.hashSync(createUserInput.password, 10),
        isActive: true,
      });

      await this.usersRepository.save(user);

      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({});
  }

  async findOne(term: string): Promise<User> {
    let user: User = null;

    if (isUUID(term)) user = await this.usersRepository.findOneBy({ id: term });

    if (!user) user = await this.usersRepository.findOneBy({ email: term });

    if (!user) throw new NotFoundException(`User not found`);

    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput):Promise<User> {
    await this.findOne(id);

    const user: User = await this.usersRepository.preload(updateUserInput);

    try {
      await this.usersRepository.save(user);

      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(id: string): Promise<User> {
    const user: User = await this.findOne(id);

    const userToDesactivate = await this.usersRepository.preload({
      ...user,
      isActive: false,
    });

    try {
      await this.usersRepository.save(userToDesactivate);

      return userToDesactivate;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  handleDBErrors(error) {
    console.log(error);

    if (error.code === '23505')
      throw new BadRequestException('Email already exists');

    throw new InternalServerErrorException(
      'Something went wrong, check server logs!',
    );
  }
}
