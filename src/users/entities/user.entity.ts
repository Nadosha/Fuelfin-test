import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class UserEntity {
  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'name@provider.com',
    description: 'The date of the transaction',
  })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column('varchar', {
    length: 255,
  })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
