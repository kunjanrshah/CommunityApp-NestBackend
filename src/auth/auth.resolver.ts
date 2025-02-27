import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from 'src/domain/user/args/user.login.args';
import { AuthResponse, RegisterInput } from 'src/domain/user/args/user.register.args';
import { Public } from 'src/public.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthResponse)
  async register(@Args('RegisterInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Public()
  @Mutation(() => AuthResponse)
  async login(@Args('LoginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput.mobile, loginInput.password);
  }

  @Public()
  @Mutation(() => AuthResponse)
  async refreshToken(@Args('token') token: string) {
    return this.authService.refreshToken(token);
  }

  // @Mutation(() => String)
  // async forgotPassword (@Args('email') email: string) {
  //   return this.authService.forgotPassword(email);
  // }
}
