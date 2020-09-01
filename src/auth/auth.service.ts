import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';
import { UserRole } from '../users/user-roles.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){}

    async singUp(createUserDto: CreateUserDto): Promise<User>{
        if(createUserDto.password != createUserDto.passwordConfirmation){
            throw new UnprocessableEntityException("As senhas não conferem!");
        }else{
            return await this.userRepository.createUser(createUserDto, UserRole.USER);
        }
    }
}
