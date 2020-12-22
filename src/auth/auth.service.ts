import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Connection, Model } from 'mongoose';
import { SigninCredentials } from './DTO/Signin.dto';
import { SignupCredentials } from './DTO/Signup.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.schemna';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
    private jwtService: JwtService,
  ) {}

  async signUp(creds: SignupCredentials) {
    const salt = await bcrypt.genSalt();
    const genPass = await this.hashPassword(creds.password, salt);
    const newProduct = new this.userModel({
      ...creds,
      password: genPass,
      salt,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async signin(
    authCredentialsDto: SigninCredentials,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.userModel.find({ email });

    if (user.length === 0) {
      throw new BadRequestException(
        'Invalid detials. Your user or password details are wrong. ',
      );
    } else if (!(await bcrypt.compare(password, user[0].password))) {
      console.log('password wrong');
      throw new BadRequestException(
        'Invalid detials. Your user or password details are wrong. ',
      );
    }

    const payload: JwtPayload = {
      email: user[0].email,
      f_name: user[0].f_name,
      l_name: user[0].l_name,
      adress: user[0].adress,
      city: user[0].city,
      postal_code: user[0].postal_code,
      id: user[0].id,
    };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  getUserByToken(token) {
    const user = this.jwtService.verify(token.token);
    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
