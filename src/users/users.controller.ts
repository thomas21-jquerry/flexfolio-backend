import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Body, 
    UseGuards,
    HttpStatus,
    HttpCode,
    Query
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { CreateProfileDto } from './dto/create-profile-dto';
  import { AuthGuard } from '../auth/auth.guard';
  import { CurrentUser } from '../auth/auth.decordator';
  import { UserProfile } from '../types/user.types';
  import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
  
  @ApiTags('Users') // Groups under "Users" in Swagger UI
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @ApiOperation({ summary: 'Create a user profile' })
    @ApiResponse({ status: 201, description: 'Profile created' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @Post('profile')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async createProfile(
      @CurrentUser() userId: any,
      @Body() createProfileDto: CreateProfileDto
    ): Promise<UserProfile> {
      return this.usersService.createProfile(userId.id, createProfileDto);
    }
  
    @ApiOperation({ summary: 'Get the authenticated user’s profile' })
    @ApiResponse({ status: 200, description: 'Profile retrieved' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@CurrentUser() userId: any): Promise<UserProfile> {
      return this.usersService.getProfile(userId.id);
    }

    @ApiOperation({ summary: 'Get the authenticated user’s profile' })
    @ApiResponse({ status: 200, description: 'Profile retrieved' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    @Get('profiles')
    async getProfiles(
      @Query('page') page = 1,
      @Query('limit') limit = 10,): Promise<UserProfile[]> {
      return this.usersService.getAllProfiles(limit,page);
    }
  
    @ApiOperation({ summary: 'Update the authenticated user’s profile' })
    @ApiResponse({ status: 200, description: 'Profile updated', })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('profile')
    async updateProfile(
      @CurrentUser() userId: any,
      @Body() updateData: Partial<CreateProfileDto>
    ): Promise<UserProfile> {
      return this.usersService.updateProfile(userId.id, updateData);
    }
  
    @ApiOperation({ summary: 'Delete the authenticated user’s profile' })
    @ApiResponse({ status: 204, description: 'Profile deleted' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Delete('profile')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async deleteProfile(@CurrentUser() userId: any): Promise<void> {
      return this.usersService.deleteProfile(userId.id);
    }
  
    @ApiOperation({ summary: 'Get a user’s profile by ID (Admin Only)' })
    @ApiResponse({ status: 200, description: 'Profile retrieved' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @Get('profile/:userId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async getProfileById(
      @CurrentUser() currentUserId: string,
      @Body('userId') targetUserId: string
    ): Promise<UserProfile> {
      // TODO: Add admin role check here
      return this.usersService.getProfile(targetUserId);
    }
  }