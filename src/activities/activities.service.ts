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
            const array = await this.repositoryUser.findOneBy({ id });
            if (!array) throw new NotFoundException('Tarea no encontrada');
            return array;
        }

        async findByUser(id: number) : Promise<Activity[]>  {
            const array = await this.repositoryUser.find({ where: { idUser: id , activated: true} });
            if (!array) throw new NotFoundException('Tarea no encontradas');
            console.log(array)
            return array;
        }
    
        async update(id: number): Promise<Activity> {
            const activity = await this.findOne(id)
            activity.activated = false;
            await this.repositoryUser.update(id, activity);
            return this.findOne(id);
        }

        async updateCompleted(id: number): Promise<Activity> {
            const activity = await this.findOne(id)
            activity.completed = true;
            await this.repositoryUser.update(id, activity);
            return this.findOne(id);
        }
}
