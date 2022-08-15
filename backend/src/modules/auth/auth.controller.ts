import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/config/auth.guard';
import { CredentialDTO } from 'src/dto/auth/credential.dto';
import { TokenResponseDTO } from 'src/dto/auth/token-response.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('/signin')
    @ApiOkResponse({
        type: CredentialDTO,
    })
    @ApiOperation({
        summary: 'Signin Endpoint',
        description: 'POST endpoint to login to the system',
    })
    async signin(
        @Body() credentialDTO: CredentialDTO,
    ): Promise<TokenResponseDTO> {
        return this.authService.login(credentialDTO)
    }
}
