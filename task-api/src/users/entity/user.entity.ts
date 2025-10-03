import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tasks } from './task.entity'

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column({ length: 100 })
    nome: string;

    @Column({ unique: true, length: 100 })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Tasks, (task) => task.user)
    task: Tasks[];    
}