import { registerEnumType } from '@nestjs/graphql';

export enum ValidRoles {
  admin = 'admin',
  employee = 'employee',
  user = 'user',
}

registerEnumType(ValidRoles, {
  name: 'ValidRoles',
  description: 'Allowed roles for users.',
});
