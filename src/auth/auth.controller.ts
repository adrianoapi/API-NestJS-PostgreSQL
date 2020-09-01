import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

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
            }
        }
}
