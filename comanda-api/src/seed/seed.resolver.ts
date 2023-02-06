import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SeedService } from './seed.service';
import { SeedResponse } from './interfaces/seed-response.interface';

@Resolver()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  @Mutation(() => Boolean)
  runSeed(): Promise<Boolean> {
    return this.seedService.runSeed();
  }
}
