import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn('varchar', { length: 255, nullable: false })
  id: string;

  @Column('varchar', { length: 255, nullable: true })
  email: string | null;

  @Column('varchar', { length: 255, nullable: false })
  nickname: string;
}
