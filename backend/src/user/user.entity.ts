import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  email: string;

  @Column('varchar', { length: 255, nullable: true })
  generatedString: string | null;
}
