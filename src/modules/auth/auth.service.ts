import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Constants } from 'src/config/Constants';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async getAllProfiles(): Promise<any> {
    return this.userService.findAll();
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
  
    if (!user) {
      throw new Error('User not found');
    }
  
    const isPasswordMatched = await bcrypt.compare(password, user.password);
  
    if (!isPasswordMatched) {
      return {
        success: false,
        message: 'Incorrect password',
      };
    }
  
    const payload = { email: user.email, userId: user._id, role: user.role };
    const token = jwt.sign(payload, Constants.jwt, { expiresIn: '259d' });
  
    return {
      success: true,
      token,
    };
  }
}
