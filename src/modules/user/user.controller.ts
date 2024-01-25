import {
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
import { ClientType } from 'src/types/ClientType';
import { Client } from '../auth';
import { CreateUserReqDto } from './dto/CreateUser.req.dto';
import { UpdateUserReqDto } from './dto/UpdateUser.req.dto';
import { SearchUserReqDto } from './dto/SearchUser.req.dto';
import { UserObject } from 'src/objects/user.object';

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
    const users = await this.userService.search({
      name: dto.name,
      studentId: dto.studentId,
    });
    return {
      users: UserObject.fromArray(users),
    };
  }

  @Get(':userId')
  @Role(['User', 'User:Admin', 'Project:AuthService'])
  async getUser(
    @Param('userId') id: string | 'me',
    @Client() client: ClientType,
  ) {
    const userId = this.userService.getAndCheckUserId(id, client);
    const user = await this.userService.findOne(userId);
    return {
      user: UserObject.from(user),
    };
  }

  @Post()
  @Role(['User:Admin'])
  async createUser(@Body() dto: CreateUserReqDto) {
    const user = await this.userService.create({
      name: dto.name,
      studentId: dto.studentId,
      department: dto.department,
      profileImage: dto.profileImage,
    });
    return {
      user: UserObject.from(user),
    };
  }

  @Patch(':userId')
  @Role(['User', 'User:Admin', 'Project:AuthService'])
  async updateUser(
    @Param('userId') id: string | 'me',
    @Body() dto: UpdateUserReqDto,
    @Client() client: ClientType,
  ) {
    const userId = this.userService.getAndCheckUserId(id, client);
    const user = await this.userService.update(userId, dto);
    return {
      user: UserObject.from(user),
    };
  }

  @Delete(':userId')
  @Role(['User', 'User:Admin'])
  async deleteUser(
    @Param('userId') id: string | 'me',
    @Client() client: ClientType,
  ) {
    const userId = this.userService.getAndCheckUserId(id, client);
    await this.userService.delete(userId);
  }
}
