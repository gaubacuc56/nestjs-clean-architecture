import { MoreThanOrEqual, Repository } from 'typeorm'
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@Domain/entities/User";
import { IUserRepository } from '@Application/interfaces/user';

@Injectable()
export class UserRepository implements IUserRepository {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  public async findByResetKey(resetKey: string) {
    return await this.userRepository.findOne({
      where: {
        resetKey,
        resetKeyExpired: MoreThanOrEqual(new Date()),
      },
    });
  }

  public async findById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async createUser(data: {
    password: string;
    email: string;
    name: string;
  }) {
    const newUser = this.userRepository.create(data);
    return await this.userRepository.save(newUser);
  }

  public async updateResetKey(
    id: string,
    resetKey: string | undefined,
    resetKeyExpired: Date | undefined
  ) {
    await this.userRepository.update(id, { resetKey, resetKeyExpired });
  }

  public async changePassword(id: string, password: string) {
    await this.userRepository.update(id, { password });
  }
}
