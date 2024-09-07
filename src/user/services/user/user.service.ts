import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { CreateOrUpdateUserDto } from 'src/user/dtos/user.dto';
import { Repository } from 'typeorm';

/**
 * Service responsible for user management.
 * This service handles CRUD operations for the User entity.
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Find and returns all users from the database.
   * @returns {Promise<User[]>} A promise that resolves with an array of users.
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * Find and returns a user by their ID from the database.
   * @param {number} id The ID of the user to find.
   * @returns {Promise<User | undefined>} A promise that resolves with a user if found, or undefined otherwise.
   * @throws {HttpException} If the user is not found.
   */
  async findOne(id: number): Promise<User | undefined> {
    const userExists = await this.userRepository.findOne({ where: { id } });
    if (!userExists) {
      throw new HttpException('User not found', 404);
    }
    return userExists;
  }

  /**
   * Create a new user in the database.
   * @param {User} user The user to create.
   * @returns {Promise<User>} A promise that resolves with the created user.
   * @throws {HttpException} If the user already exists.
   */
  async create(user: CreateOrUpdateUserDto): Promise<User> {
    const userExists = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (userExists) {
      throw new HttpException(
        'User already exists, or the email has been used. Please provide a unique email.',
        409,
      );
    }
    return await this.userRepository.save(user);
  }

  /**
   * Update an existing user in the database.
   * @param {number} id The ID of the user to update.
   * @param {User} user The updated user data.
   * @returns {Promise<User>} A promise that resolves with the updated user.
   * @throws {HttpException} If the user is not found.
   */
  async update(id: number, user: User): Promise<User> {
    await this.findOne(id);
    await this.userRepository.update(id, user);
    return await this.findOne(id);
  }

  /**
   * Delete a user from the database by their ID.
   * @param {number} id The ID of the user to delete.
   * @returns {Promise<void>} A void promise that resolves when the user is deleted.
   * @throws {HttpException} If the user is not found.
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.userRepository.delete(id);
  }
}
