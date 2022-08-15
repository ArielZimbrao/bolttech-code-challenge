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
import { ProjectEntity } from './project.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {
        length: 100,
        nullable: false,
    })
    name: string;

    @Column('varchar', {
        length: 100,
        nullable: false,
    })
    email: string;

    @Column('varchar', {
        length: 100,
        nullable: false,
    })
    password: string;

    @Column('date', { nullable: true })
    last_sigin: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => ProjectEntity, (projectEntity) => projectEntity.user)
    @JoinColumn()
    projects: ProjectEntity[];
}
