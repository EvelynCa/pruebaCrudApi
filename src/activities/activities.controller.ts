import { Controller } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivityDto } from './dto/activity.dto';
import { Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/login/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@Controller('activities')
export class ActivitiesController {

    constructor(private readonly activityService: ActivitiesService) {}

    @Post()
    create(@Body() dto: ActivityDto) {
      console.log(dto)
      return this.activityService.create(dto);
    }
  
    @Get()
    findAll() {
      return this.activityService.findAll();
    }
  
    @Get('user/:id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
       return await this.activityService.findByUser(id);
    }
  
    @Put('update/:id')
    update(@Param('id', ParseIntPipe) id: number) {
      return this.activityService.update(id);
    }

    @Put('completed/:id')
    completed(@Param('id', ParseIntPipe) id: number) {
      return this.activityService.updateCompleted(id);
    }
}
