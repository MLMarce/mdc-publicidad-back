import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/enums/roles.enum';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from 'src/auth/dto/create-auth.dto';
import { UpdateUserDto } from 'src/auth/dto/update-auth.dto';
import { UserStatus } from 'src/enums/user-status.enum';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (!users.length) throw new BadRequestException('Users not found');
    return users;
  }
  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'phone'],
      relations: {},
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email,
      status: UserStatus.Active,
    });
    return user;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = user.password;
    newUser.phone = user.phone;
    newUser.status = UserStatus.Active;
    await this.userRepository.save(newUser);
    const createdUser = await this.userRepository.findOne({
      where: { email: newUser.email },
      select: ['id', 'name', 'email', 'phone'],
    });

    return createdUser;
  }

  async createUserAuth(user: User) {
    const newUser = await this.userRepository.save(user);
    return this.userRepository.findOne({
      where: { id: newUser.id },
      select: ['id', 'name', 'email', 'phone', 'image'],
    });
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: { id },
    });
    if (!foundUser) throw new NotFoundException('User not found');
    await this.userRepository.update(id, user);
    return await this.userRepository.findOne({
      where: { id },
    });
  }
  async deleteUser(id: string): Promise<string> {
    const foundUser = await this.userRepository.findOne({
      where: { id, status: UserStatus.Active },
    });
    if (!foundUser) throw new NotFoundException('User not found');
    await this.userRepository.update(id, { status: UserStatus.Deleted });
    return 'User with ID ' + id + ' deleted successfully';
  }
  async createAdmin(): Promise<User> {
    const hashedPassword = await bcrypt.hash('A.p.2024', 10);
    const emailAdmin = 'advancedparking.2024@gmail.com';

    const oldUserAdmin = await this.userRepository.findOne({
      where: { email: emailAdmin },
    });
    if (oldUserAdmin) throw new BadRequestException('User already exists');

    const newUser = new User();
    newUser.name = 'Usuario Administrador';
    newUser.email = emailAdmin;
    newUser.password = hashedPassword;
    newUser.phone = 1112345678;
    newUser.status = UserStatus.Active;
    newUser.role = Role.Admin;
    await this.userRepository.save(newUser);
    const createdUser = await this.userRepository.findOne({
      where: { email: newUser.email },
      select: ['id', 'name', 'email', 'phone', 'role'],
    });

    return createdUser;
  }
}
