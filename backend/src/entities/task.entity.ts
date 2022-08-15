import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { UserEntity } from './user.entity';
  
  @Entity('task')
  export class TaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('varchar', {
      length: 100,
      nullable: false,
    })
    description: string;

    @Column('boolean', {
        nullable: false,
        default: true,
    })
    active: Boolean

    @Column('boolean', {
      nullable: false,
      default: false,
    })
    done: Boolean
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => ProjectEntity, (projectEntity) => projectEntity.tasks)
    @JoinColumn()
    project: ProjectEntity;

  }
  