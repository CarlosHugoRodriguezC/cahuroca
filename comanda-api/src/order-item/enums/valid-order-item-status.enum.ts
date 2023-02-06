import { registerEnumType } from '@nestjs/graphql';

export enum ValidOrderItemStatus {
  archived = 'archived',
  active = 'active',
}

registerEnumType(ValidOrderItemStatus, { name: 'ValidOrderItemStatus' });
