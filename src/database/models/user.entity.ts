import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Transform } from 'class-transformer';
import * as moment from 'moment';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  @ApiProperty()
  email: string;

  @Column({ length: 100, default: '', nullable: true, name: 'first_name' })
  @ApiProperty()
  firstName: string;

  @Column({ length: 100, default: '', nullable: true, name: 'last_name' })
  @ApiProperty()
  lastName: string;

  @Column({ nullable: true })
  @ApiProperty()
  avatar: string;

  @Column({ length: 5, nullable: true, name: 'phone_code' })
  @ApiProperty()
  phoneCode: string;

  @Column({ length: 15, nullable: true, name: 'phone_number' })
  @ApiProperty()
  phoneNumber: string;

  @Column({ type: 'timestamp', nullable: true, name: 'deleted_at' })
  @Transform(({ value }) => moment(value).unix())
  @ApiProperty({ type: 'number', example: 1546300800 })
  deletedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ type: 'string', format: 'date-time' })
  updatedAt: Date;
}
