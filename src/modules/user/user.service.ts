import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserNotFoundException } from 'src/errors';
import { InvalidClientType } from 'src/errors/InvalidClientType';
import { ClientType, ClientUser } from 'src/types/ClientType';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: {
    name: string;
    studentId: string;
    department: string;
    profileImage?: string;
  }): Promise<User> {
    const user = User.create({
      name: data.name,
      studentId: data.studentId,
      department: data.department,
      profileImage: data.profileImage,
    });
    return await this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async search(query: { name?: string; studentId?: string }): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        name: query.name,
        studentId: query.studentId,
      },
    });
  }

  async update(id: number, data: { profileImage?: string }): Promise<User> {
    let user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    }
    await this.userRepository.update(
      { id },
      {
        profileImage: data.profileImage,
      },
    );
    user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    }
    await this.userRepository.softDelete({ id });
  }

  getAndCheckUserId(id: string, client: ClientType) {
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
