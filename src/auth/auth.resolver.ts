import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from 'src/domain/user/args/user.login.args';
import { AuthResponse, RegisterInput } from 'src/domain/user/args/user.register.args';
import { Public } from 'src/public.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from './email.service';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { ForgotPasswordInput } from './dto/forgot-password.input';
import { ResetPasswordInput } from './dto/reset-password.input';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

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

  @Public()
  @Mutation(() => String)
  async forgotPassword(@Args('forgotPasswordInput') forgotPasswordInput: ForgotPasswordInput) {
    const { email } = forgotPasswordInput;
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user) throw new Error('User not found');

    // Generate reset token & expiry (1 hour)
    const resetToken = uuidv4();
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    // Save token in DB
    await this.prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });

    // Send reset email
    await this.emailService.sendPasswordResetEmail(email, resetToken);

    return 'Password reset link sent to email!';
  }

  // 🔹 Reset Password Mutation
  @Mutation(() => String)
  @Public()
  async resetPassword(@Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput) {
    const { token, password } = resetPasswordInput;

    // If we dont have DB then its other technic to retrive user
    //  const payload = this.jwtService.verify(token);
    // const userId = payload.userId;

    // Find user by token
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gte: new Date() },
        // Ensure token is not expired
      },
      select: { id: true },
    });

    if (!user) throw new Error('Invalid or expired token');

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password & clear reset token
    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetToken: null, resetTokenExpiry: null },
    });

    return 'Password successfully reset!';
  }
}
