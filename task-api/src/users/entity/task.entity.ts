import { type } from 'os';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity'

@Entity('tasks')
export class Tasks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    title: string;

    @Column({ length: 256 })
    description: string;

    @Column({ length: 20 })
    status: string;

    @Column({type: 'date'})
    expirationDate: string;

    @ManyToOne(() => User, (user) => user.task) // esta linha foi adicionada
    user: User;    



}

@EntityRepository(Tasks)
export class TaskRepository extends Repository<Tasks>{
    async deleteTask(id:number): Promise<void>{
        await this.delete(id);
    }
}