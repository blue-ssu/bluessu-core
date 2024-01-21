import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserNotFoundException } from 'src/errors';
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
    profileImage?: string;
  }): Promise<User> {
    const user = User.create({
      name: data.name,
      studentId: data.studentId,
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

  async search(query: {
    name?: string;
    studentId?: string;
    profileImage?: string;
  }): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        name: query.name,
        studentId: query.studentId,
        profileImage: query.profileImage,
      },
    });
  }

  async update(id: number, data: { profileImage?: string }): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    }
    await this.userRepository.update(
      { id },
      {
        profileImage: data.profileImage,
      },
    );
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    }
    await this.userRepository.softDelete({ id });
  }
}
