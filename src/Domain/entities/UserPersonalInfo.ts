import { Entity, Column, OneToOne, Unique } from 'typeorm';

import { BaseSoftDelete } from '@Domain/common/base-entity/base';

import { User } from './User';

@Entity({ name: 'userpersonalinfo' })
@Unique(['userId'])
export class UserPersonalInfo extends BaseSoftDelete {
  @Column({ name: 'user_id' })
  public userId: string;

  @Column({ nullable: true, name: 'first_name' })
  public firstName: string;

  @Column({ nullable: true, name: 'last_name' })
  public lastName: string;

  @Column({ nullable: true, name: 'phone_number' })
  public phoneNumber: string;

  @Column({ nullable: true })
  public address: string;

  @OneToOne(() => User, (user) => user.personalInfo, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  public user: User;
}
