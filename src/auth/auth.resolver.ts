import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from 'src/domain/user/args/user.login.args';
import { AuthResponse, RegisterInput } from 'src/domain/user/args/user.register.args';
import { Public } from 'src/public.decorator';

@Resolver()
@Public()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public() // 👈 Skips authentication for this resolver
  @Mutation(() => AuthResponse)
  async register(@Args('input') input: RegisterInput) {
    return this.authService.register(input);
  }

  @Public() // 👈 Skips authentication for this resolver
  @Mutation(() => AuthResponse)
  async login(@Args('input') input: LoginInput) {
    return this.authService.login(input.mobile, input.password);
  }

  @Public() // 👈 Skips authentication for this resolver
  @Mutation(() => AuthResponse)
  async refreshToken(@Args('token') token: string) {
    return this.authService.refreshToken(token);
  }
}
