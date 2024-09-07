import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { User } from 'src/shared/entities/user.entity';

export class GetAllUsersResponseDto {
  @ApiProperty({ example: 1 })
  status: number;

  @ApiProperty({
    example: [{ id: 1, name: 'Jhon Doe', email: 'jdoe@gmail.com' }],
  })
  data: User[];
}

export class GetOneUserByIdResponseDto {
  @ApiProperty({ example: 1 })
  status: number;

  @ApiProperty({
    example: { id: 1, name: 'Jhon Doe', email: 'jdoe@gmail.com' },
  })
  data: User;
}

export class CreateOrUpdateUserDto {
  @ApiProperty({ example: 1, nullable: true, required: false })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ example: 'Jhon Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'jdoe@gmail.com' })
  @IsNotEmpty()
  email: string;
}

export class SuccessResponseDto {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty()
  message: string = 'User created successfully.';
}
