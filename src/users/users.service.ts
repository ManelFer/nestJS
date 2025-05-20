import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        // Inject the User repository here
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }
    async findOne(username: string): Promise<User | undefined> {
        const user = await this.usersRepository.findOne({ where: { username } });
        return user === null ? undefined : user;
    }
    async create(username: string, password: string): Promise<User> {
        const user = this.usersRepository.create({ username, password });
        return this.usersRepository.save(user);
    }
}
