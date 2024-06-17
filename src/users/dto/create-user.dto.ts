import { Column } from 'typeorm';

export class CreateUserDto {
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column('varchar', {
    length: 255,
  })
  password: string;
}
