import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { TaskEntity } from './task.entity';
import { UserEntity } from './user.entity';
  
@Entity('project')
export class ProjectEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {
    length: 100,
    nullable: false,
    })
    name: string;

    @Column('boolean', {
        nullable: false,
        default: true,
    })
    active: Boolean

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.projects)
    @JoinColumn()
    user: UserEntity;

    @OneToMany(() => TaskEntity, (taskEntity) => taskEntity.project)
    @JoinColumn()
    tasks: TaskEntity[];
}
  