import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('plan')
export class Plan {
  @PrimaryColumn('varchar', { length: 255, nullable: false })
  id: string;

  @Column('varchar', { length: 65535, nullable: true })
  plan: string;

  @Column('varchar', { length: 255, nullable: false })
  ownerId: string;

  @Column('varchar', { length: 255, nullable: true })
  name: string;

  @Column('varchar', { length: 65535, nullable: true })
  output: string;

  @Column('varchar', { length: 65535, nullable: true })
  input: string;
}
