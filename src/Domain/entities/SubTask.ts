import {
    Entity,
    Column,
    ManyToOne,

} from 'typeorm';
import { Task } from './Task';
import { BaseSoftDelete } from '@Domain/common/base-entity/base';

@Entity({ name: 'subtask' })
export class SubTask extends BaseSoftDelete {
    @Column({ name: 'parent_id' })
    public parentId: string;

    @Column()
    public content: string;

    @ManyToOne(() => Task, (task) => task.SubTasks, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    public task: Task;
}
