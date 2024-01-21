import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('credit')
export class Credit extends BaseEntity {
  @Column({ length: 32 })
  name: string;

  @Column()
  role: string;

  static create(name: string, role: string) {
    const credit = new Credit();
    credit.name = name;
    credit.role = role;
    return credit;
  }
}
