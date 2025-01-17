import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private readonly userService: UserService) {}
 
    async canActivate (context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    console.log('Request Body:', ctx.req.body);

    const { mobile, password } = ctx.req.body.variables;

    const user:UserEntity = await this.userService.findUserByMobile(mobile);
    if(user && user.password === password){
      ctx.user = user;
      return true;
    }else{
        throw new HttpException('UnAuthenticated', HttpStatus.NOT_FOUND);
    }


  }
}
