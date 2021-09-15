import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';
import { UserService } from 'src/models/user/user.service';
import { JwtAuthGuard } from 'src/utils/auth/jwt-auth.guard';

@Injectable()
export class TaskBoardGuard extends JwtAuthGuard implements CanActivate {
  constructor(@Inject(UserService) private userService: UserService) {
    super();
  }

  transformCanActivateToPromise(
    value: boolean | Promise<boolean> | Observable<boolean>,
  ): Promise<boolean> {
    if (value instanceof Promise) {
      return value;
    }

    if (value instanceof Observable) {
      return firstValueFrom(value);
    }

    return Promise.resolve(value);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isAuth = await this.transformCanActivateToPromise(
      super.canActivate(context),
    );

    if (!isAuth) {
      return false;
    }

    return this.userService.userHasPermission(
      request.user.id,
      parseInt(request.body.boardId || request.params.boardId),
    );
  }
}
