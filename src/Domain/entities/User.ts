import {
    Entity,
    Column,
    OneToMany,
    OneToOne,
    Unique
} from 'typeorm';
import { Task } from './Task';
import { UserPersonalInfo } from './UserPersonalInfo';
import { BaseSoftDelete } from '@Domain/common/base-entity/base';
import { Role } from '@Domain/common/enum/user';

@Entity({ name: 'user' })
@Unique(['email'])
export class User extends BaseSoftDelete {
    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @Column({ name: 'reset_key', nullable: true })
    public resetKey?: string;

    @Column({ name: 'reset_key_expired', nullable: true })
    public resetKeyExpired?: Date;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    public role: Role;

    @OneToMany(() => Task, (task) => task.Users)
    public tasks: Task[];

    @OneToOne(() => UserPersonalInfo, (personalInfo) => personalInfo.user, { cascade: true })
    public personalInfo?: UserPersonalInfo;
}
