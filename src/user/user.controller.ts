import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { ParseIntPipe } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Put } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    
    constructor(private readonly userService: UserService) {}
    
    @Post()
    create(@Body() dto: UserDto) {
        return this.userService.create(dto);
    }
    
    @Get()
    findAll() {
        return this.userService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }
    
    @Put('update/:id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<UserDto>) {
        return this.userService.update(id, dto);
    }
}
