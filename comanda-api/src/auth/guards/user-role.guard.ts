import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Observable } from 'rxjs';
  import { UnauthorizedException } from '@nestjs/common';
import { META_ROLES } from '../decorators';
import { User } from 'src/users/entities/user.entity';
  
  @Injectable()
  export class UserRoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const validRoles: string[] = this.reflector.get(
        META_ROLES,
        context.getHandler(),
      );
  
      if (!validRoles) return true;
      if (validRoles.length === 0) return true;
  
      const req = context.switchToHttp().getRequest();
      const user: User = req.user;
  
      if (!user) throw new NotFoundException('User not found');
      
      if (!validRoles.some((role) => user.roles.includes(role)))
        throw new UnauthorizedException(
          'Forbidden resource for the current user',
        );
  
      return true;
    }
  }