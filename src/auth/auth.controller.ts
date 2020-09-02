import { Controller, Post, Body, ValidationPipe, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    async signUp(
        @Body(ValidationPipe) CreateUserDto: CreateUserDto,
        ): Promise<{ message: string }> {
            await this.authService.singUp(CreateUserDto);
            return {
                message: 'Cadstro realizado com sucesso!',
            };
        }

    @Post('signin')
    async signIn(
        @Body(ValidationPipe) CredentialsDto: CredentialsDto,
        ): Promise<{ token: string }>{
            return await this.authService.signIn(CredentialsDto);
        } 

    @Get('/me')
    @UseGuards(AuthGuard())
    getMe(@GetUser() user: User): User {
        return user;
    }
}
