import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../schema/user.schema';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER
  })
  role: Role;

  @Column({ nullable: true })
  head_id?: number;

  @Column({ nullable: true })
  member_code?: string;

  @Column({ nullable: true })
  email_address?: string;

  @Column({ nullable: true })
  mobile?: string;

  @Column({ nullable: true })
  plain_password?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  relationship_id?: number;

  @Column({ nullable: true })
  sub_community_id?: number;

  @Column({ nullable: true })
  local_community_id?: number;

  @Column({ nullable: true })
  first_name?: string;

  @Column({ nullable: true })
  last_name_id?: number;  // Assuming it maps to `last_name` in GraphQL

  @Column({ nullable: true })
  father_name?: string;

  @Column({ nullable: true })
  mother_name?: string;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: true })
  gender?: string;  // Map to gender field

  @Column({ nullable: true })
  phone?: string;

  @Column({ default: 'noimage.png' })
  profile_pic: string;

  @Column({ nullable: true })
  region?: string;

  @Column({ default: false })
  is_expired: boolean;

  @Column({ nullable: true })
  expire_date?: Date;

  @Column({ nullable: true })
  education_id?: number;

  @Column({ nullable: true })
  occupation_id?: number;

  @Column({ default: false })
  deleted: boolean;

  @Column({ nullable: true })
  login_status?: boolean;  // Boolean to map login_status field

  @Column({ nullable: true })
  last_login?: Date;  // Date type for last_login

  @Column({ nullable: true })
  profile_password?: string;

  @Column({ default: 5 })
  profile_percent: number;
}
