import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TokenService } from '../../token.service';
import { UserService } from 'src/modules/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

const getCookieString = (cookies: { [key: string]: string }) => {
  return Object.entries(cookies)
    .map(([key, value]) => `${key}=${value}`)
    .join(' ');
};

@Injectable()
export class SsoService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signIn(sToken: string) {
    const ssoUser = await this.getUserFromSSO(sToken);
    let user = await this.userRepository.findOne({
      where: {
        studentId: ssoUser.studentId,
      },
    });

    if (!user) {
      user = await this.userService.create({
        studentId: ssoUser.studentId,
        name: ssoUser.name,
        profileImage: 'https://example.com',
      });
    }

    const token = this.tokenService.generateUserToken(user.id);
    return {
      token,
    };
  }

  async getUserFromSSO(sToken: string) {
    const cookies = {};

    const second = await axios.get(`https://saint.ssu.ac.kr/webSSO/sso.jsp`, {
      headers: {
        Cookie: `sToken=${sToken}`,
        connection: 'keep-alive',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.46',
      },
      withCredentials: true,
    });

    second.headers['set-cookie']
      .map((cookie) => cookie.replace(' Path=/', '').replace(' Version=1;', ''))
      .forEach((cookie) => {
        const [key, value] = cookie.split('=');
        cookies[key] = value;
      });

    const res = await axios.get('https://saint.ssu.ac.kr/irj/portal', {
      headers: {
        connection: 'keep-alive',
        Cookie: getCookieString(cookies),
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.46',
      },
      responseType: 'text',
      withCredentials: true,
    });

    const studentId = (res.data as string).match(/"LogonUid":"(\d+)"/)?.[1];
    const name = (res.data as string).match(/"LastName":"([^"]+)"/)?.[1];

    return {
      studentId,
      name,
    };
  }
}
