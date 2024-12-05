import { Controller, Post, Body, Get, UseGuards, Request, Delete, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AdminGuard } from './admin.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('admins')
  getAdmins() {
    return this.usersService.findAllAdmins();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('register-admin')
  async registerAdmin(@Body() body: { email: string; password: string }) {
    return this.authService.registerAdmin(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('admin/:id')
  async removeAdmin(@Param('id') id: string) {
    return this.usersService.removeAdmin(id);
  }
}
