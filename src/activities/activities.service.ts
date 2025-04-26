import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ActivityDto } from './dto/activity.dto';

@Injectable()
export class ActivitiesService {
    constructor(@InjectRepository(Activity) private repositoryUser: Repository<Activity>) {}
    
        async create(dto: ActivityDto): Promise<Activity> {
            const user = this.repositoryUser.create(dto);
            return this.repositoryUser.save(user);
        }
    
        async findAll(): Promise<Activity[]> {
            return this.repositoryUser.find();
        }
    
        async findOne(id: number): Promise<Activity> {
            const user = await this.repositoryUser.findOneBy({ id });
            if (!user) throw new NotFoundException('Tarea no encontrada');
            return user;
        }
    
        async update(id: number, dto: Partial<ActivityDto>): Promise<Activity> {
            await this.repositoryUser.update(id, dto);
            return this.findOne(id);
        }
}
