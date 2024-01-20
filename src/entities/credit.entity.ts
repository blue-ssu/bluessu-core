import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('credit')
export class Credit extends BaseEntity {
  @Column({ length: 32 })
  name: string;

  @Column()
  role: string;
}
