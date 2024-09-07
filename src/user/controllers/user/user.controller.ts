import { CrudUserUseCase } from './../../usecases/user.useCase';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { User } from 'src/shared/entities/user.entity';
import {
  SuccessResponseDto,
  CreateOrUpdateUserDto,
  GetAllUsersResponseDto,
  GetOneUserByIdResponseDto,
} from 'src/user/dtos/user.dto';

/**
 * Controller for managing user resources.
 * This controller handles requests related to users.
 */
@Controller('users')
export class UserController {
  constructor(private readonly crudUserUseCase: CrudUserUseCase) {}
  @Get()
  @ApiResponse({ status: 200, description: 'Returns all users.', type: [User] })
  async getAllUsers(): Promise<GetAllUsersResponseDto> {
    const data = await this.crudUserUseCase.findAll();
    return { status: 200, data };
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the user by ID.',
    type: User,
  })
  @ApiNotFoundResponse({ status: 400, description: 'User not found.' })
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetOneUserByIdResponseDto> {
    const data = await this.crudUserUseCase.findOne(id);
    return { status: 200, data };
  }
  @Post()
  @ApiResponse({ status: 201, description: 'Creates a new user.', type: User })
  @ApiConflictResponse({ status: 409, description: 'User already exists.' })
  async createUser(
    @Body() user: CreateOrUpdateUserDto,
  ): Promise<SuccessResponseDto> {
    await this.crudUserUseCase.create(user);
    return { status: 201, message: 'User created successfully.' };
  }

  @Patch()
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiNotFoundResponse({ status: 400, description: 'User not found.' })
  async updateUser(
    @Body() user: CreateOrUpdateUserDto,
  ): Promise<SuccessResponseDto> {
    const newUser: User = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    await this.crudUserUseCase.update(user.id, newUser);
    return { status: 200, message: 'User updated successfully.' };
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiNotFoundResponse({ status: 400, description: 'User not found.' })
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto> {
    await this.crudUserUseCase.remove(id);
    return { status: 200, message: 'User deleted successfully.' };
  }
}
