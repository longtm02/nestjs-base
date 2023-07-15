import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './services/user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/search')
  @ApiOkResponse({
    description: 'Get user by custom field',
  })
  async search() {
    const users = await this.userService.searchUser();

    return users;
  }
}
