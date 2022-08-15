import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { UserAlreadyExistsError } from 'src/exception/exception';
import { cryptoUtils } from 'src/util/crypto.utils';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<UserEntity>,
    ) {}

    async createUser(new_user: CreateUserDTO): Promise<UserEntity> {
        const userold = await this.userRepository.findOne({
            where: {
                email: new_user.email
            }
        });
    
        if (userold) {
          throw new UserAlreadyExistsError();
        }

        const user = new UserEntity();
        user.name = new_user.name;
        user.email = new_user.email;
        user.password = await cryptoUtils.preSavePassword(new_user.password);
    
        return this.userRepository.save(user)
    }
}
