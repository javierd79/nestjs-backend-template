import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core' 

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const role = user.role;
    const allowedRoles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!allowedRoles) {
      return false;
    }

    return allowedRoles.includes(role);
  }
}