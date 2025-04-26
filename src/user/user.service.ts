import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repositoryUser: Repository<User>) {}

    async create(dto: UserDto): Promise<User> {
        const user = this.repositoryUser.create(dto);
        return this.repositoryUser.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.repositoryUser.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.repositoryUser.findOneBy({ id });
        if (!user) throw new NotFoundException('Usuario no encontrado');
        return user;
    }

    async update(id: number, dto: Partial<UserDto>): Promise<User> {
        await this.repositoryUser.update(id, dto);
        return this.findOne(id);
    }
}
