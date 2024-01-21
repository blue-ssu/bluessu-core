import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from '../auth/decorators/Role.decorator';
import { ClientType, ClientUser } from 'src/types/ClientType';
import { Client } from '../auth';
import { InvalidClientType } from 'src/errors/InvalidClientType';
import { CreateUserReqDto } from './dto/CreateUser.req.dto';
import { UpdateUserReqDto } from './dto/UpdateUser.req.dto';
import { SearchUserReqDto } from './dto/SearchUser.req.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Role(['User:Admin', 'Project:AuthService'])
  async listUser() {
    return await this.userService.findAll();
  }

  @Get('search')
  @Role(['User:Admin', 'Project:AuthService'])
  async searchUser(@Body() dto: SearchUserReqDto) {
    return await this.userService.search({
      name: dto.name,
      studentId: dto.studentId,
      profileImage: dto.profileImage,
    });
  }

  @Get(':userId')
  @Role(['User', 'User:Admin', 'Project:AuthService'])
  async getUser(
    @Param('userId') id: string | 'me',
    @Client() client: ClientType,
  ) {
    const userId = this.getAndCheckUserId(id, client);
    return await this.userService.findOne(userId);
  }

  @Post()
  @Role(['User:Admin'])
  async createUser(@Body() dto: CreateUserReqDto) {
    return await this.userService.create({
      name: dto.name,
      studentId: dto.studentId,
      department: dto.department,
      profileImage: dto.profileImage,
    });
  }

  @Patch(':userId')
  @Role(['User', 'User:Admin', 'Project:AuthService'])
  async updateUser(
    @Param('userId') id: string | 'me',
    @Body() dto: UpdateUserReqDto,
    @Client() client: ClientType,
  ) {
    const userId = this.getAndCheckUserId(id, client);
    return await this.userService.update(userId, dto);
  }

  @Delete(':userId')
  @Role(['User', 'User:Admin'])
  async deleteUser(
    @Param('userId') id: string | 'me',
    @Client() client: ClientType,
  ) {
    const userId = this.getAndCheckUserId(id, client);
    return await this.userService.delete(userId);
  }

  private getAndCheckUserId(id: string, client: ClientType) {
    if (id === 'me' && client.type === 'project') {
      throw new InvalidClientType();
    }
    const userId = id === 'me' ? (client as ClientUser).user.id : +id;

    if (
      client.type === 'user' &&
      !client.user.roles.includes('User:Admin') &&
      client.user.id !== userId
    ) {
      throw new BadRequestException({
        code: 'invalid_user',
      });
    }

    return userId;
  }
}
