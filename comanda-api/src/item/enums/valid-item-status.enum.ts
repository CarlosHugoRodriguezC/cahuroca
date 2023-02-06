import { registerEnumType } from '@nestjs/graphql';

export enum ValidItemStatus {
  inStock = 'in stock',
  outOfStock = 'out of stock',
  archived = 'archived',
  disabled = 'disabled',
}

registerEnumType(ValidItemStatus, { name: 'ValidItemStatus' });
