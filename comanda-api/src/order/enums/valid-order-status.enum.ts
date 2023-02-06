import { registerEnumType } from '@nestjs/graphql';

export enum ValidOrderStatus {
  pending = 'pending',
  inProgres = 'in progress',
  readyForDispacth = 'ready for dispatch',
  delivered = 'delivered',
  paid = 'paid',
  completed = 'completed',
  archived = 'archived',
}

registerEnumType(ValidOrderStatus, {
  name: 'ValidOrderStatus',
  description: 'All status allowed for the order',
});
