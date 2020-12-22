import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninCredentials } from './DTO/Signin.dto';
import { SignupCredentials } from './DTO/Signup.dto';
import { User } from './user.schemna';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() creds: SignupCredentials) {
    return this.authService.signUp(creds);
  }
  @Post('/signin')
  signin(@Body() creds: SigninCredentials) {
    console.log(creds);
    return this.authService.signin(creds);
  }
  @Post('/getuserbytoken')
  getUserByToken(@Body() token): Promise<User> {
    return this.authService.getUserByToken(token);
  }
}
