/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface AddUserArgs {
  role: Role;
  head_id: number;
  member_code?: Nullable<string>;
  email_address?: Nullable<string>;
  mobile?: Nullable<string>;
  password: string;
  relationship_id?: Nullable<number>;
  sub_community_id: number;
  local_community_id: number;
  first_name: string;
  last_name_id: number;
  father_name?: Nullable<string>;
  mother_name: string;
  status: boolean;
  gender: boolean;
  phone?: Nullable<string>;
  profile_pic: string;
  region?: Nullable<string>;
  is_expired: boolean;
  expire_date?: Nullable<DateTime>;
  education_id?: Nullable<number>;
  occupation_id?: Nullable<number>;
  deleted: boolean;
  login_status?: Nullable<boolean>;
  last_login?: Nullable<DateTime>;
  profile_percent: number;
}

export interface RegisterUserArgs {
  first_name: string;
  last_name_id: number;
  email_address: string;
  mobile: string;
  password: string;
  sub_community_id: number;
  local_community_id: number;
  gender: boolean;
  profile_pic: string;
  state_id: number;
  city_id: number;
  address: string;
}

export interface UpdateUserArgs {
  role?: Nullable<Role>;
  head_id?: Nullable<number>;
  member_code?: Nullable<string>;
  email_address?: Nullable<string>;
  mobile?: Nullable<string>;
  password?: Nullable<string>;
  relationship_id?: Nullable<number>;
  sub_community_id?: Nullable<number>;
  local_community_id?: Nullable<number>;
  first_name?: Nullable<string>;
  last_name_id?: Nullable<number>;
  father_name?: Nullable<string>;
  mother_name?: Nullable<string>;
  status?: Nullable<boolean>;
  gender?: Nullable<boolean>;
  phone?: Nullable<string>;
  profile_pic?: Nullable<string>;
  region?: Nullable<string>;
  is_expired?: Nullable<boolean>;
  expire_date?: Nullable<DateTime>;
  education_id?: Nullable<number>;
  occupation_id?: Nullable<number>;
  deleted?: Nullable<boolean>;
  login_status?: Nullable<boolean>;
  last_login?: Nullable<DateTime>;
  profile_percent?: Nullable<number>;
}

export interface UserSchema {
  id: number;
  role: Role;
  head_id: number;
  member_code?: Nullable<string>;
  email_address?: Nullable<string>;
  mobile?: Nullable<string>;
  password: string;
  relationship_id?: Nullable<number>;
  sub_community_id?: Nullable<number>;
  local_community_id?: Nullable<number>;
  first_name: string;
  last_name_id: number;
  father_name?: Nullable<string>;
  mother_name?: Nullable<string>;
  status: boolean;
  gender: string;
  phone?: Nullable<string>;
  profile_pic: string;
  region?: Nullable<string>;
  is_expired: boolean;
  expire_date?: Nullable<DateTime>;
  education_id?: Nullable<number>;
  occupation_id?: Nullable<number>;
  deleted: boolean;
  login_status?: Nullable<boolean>;
  last_login?: Nullable<DateTime>;
  profile_percent: number;
}

export interface IQuery {
  securedResourceforUser(): string | Promise<string>;
  securedResourceforAdmin(): string | Promise<string>;
  login(mobile: string, password: string): string | Promise<string>;
  getAllUsers(): UserSchema[] | Promise<UserSchema[]>;
  findUserById(userId: number): UserSchema | Promise<UserSchema>;
  findUserByMobile(mobile: string): UserSchema | Promise<UserSchema>;
}

export interface IMutation {
  deleteUserById(userId: number): string | Promise<string>;
  addUser(addUserArgs: AddUserArgs): UserSchema | Promise<UserSchema>;
  registerUser(registerUserArgs: RegisterUserArgs): UserSchema | Promise<UserSchema>;
  updateUser(userId: number, updateUserArgs: UpdateUserArgs): UserSchema | Promise<UserSchema>;
}

export type DateTime = any;
type Nullable<T> = T | null;
