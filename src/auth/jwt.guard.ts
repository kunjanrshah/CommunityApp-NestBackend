import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtGuard implements CanActivate {
 
    async canActivate (context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    
    let token = ctx.req.headers.authorization;
    if (token) {
        token = token.split(" ")[1];
        try {
            const user = jwt.verify(token, 'secret');
            ctx.user = user;
            console.log(user);
            return true; 
        } catch (e) {
            throw new HttpException("UnAuthenticated: "+e.message, HttpStatus.UNAUTHORIZED);
        }
    }
  }
}
