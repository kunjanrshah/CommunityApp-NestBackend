/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum AddrType {
  OWN = 'OWN',
  RENTED = 'RENTED',
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface UpsertUserInput {
  user_id?: Nullable<number>;
  address_id?: Nullable<number>;
  role: Role;
  head_id?: Nullable<number>;
  member_code?: Nullable<string>;
  email?: Nullable<string>;
  mobile?: Nullable<string>;
  password?: Nullable<string>;
  relation_id?: Nullable<number>;
  sub_community_id?: Nullable<number>;
  local_community_id?: Nullable<number>;
  first_name?: Nullable<string>;
  last_name_id?: Nullable<number>;
  father_name?: Nullable<string>;
  mother_name?: Nullable<string>;
  status: boolean;
  gender?: Nullable<boolean>;
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
  city_id?: Nullable<number>;
  state_id?: Nullable<number>;
  addr_type: AddrType;
  address?: Nullable<string>;
  area?: Nullable<string>;
  pincode?: Nullable<string>;
  local_address?: Nullable<string>;
  mosaad_id?: Nullable<number>;
}

export interface RegisterInput {
  first_name: string;
  last_name_id: number;
  email: string;
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

export interface LoginInput {
  mobile: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: Nullable<string>;
  message: string;
}

export interface UserAddressModel {
  id: number;
  user_id: number;
  address: string;
  city_id: number;
  state_id: number;
  local_address?: Nullable<string>;
  mosaad_id?: Nullable<number>;
  area?: Nullable<string>;
  pincode?: Nullable<string>;
  addr_type: AddrType;
}

export interface UserModel {
  id: number;
  role: Role;
  head_id: number;
  member_code?: Nullable<string>;
  email?: Nullable<string>;
  mobile?: Nullable<string>;
  password: string;
  relation_id?: Nullable<number>;
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
  address?: Nullable<UserAddressModel>;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface IQuery {
  securedResourceforAdmin(): string | Promise<string>;
  isAppVersionExists(version: number): boolean | Promise<boolean>;
}

export interface IMutation {
  changePassword(
    ChangePasswordInput: ChangePasswordInput,
  ): ChangePasswordResponse | Promise<ChangePasswordResponse>;
  upsertUser(upsertUserInput: UpsertUserInput): UserModel | Promise<UserModel>;
  updateLastLogin(user_id: number): boolean | Promise<boolean>;
  register(RegisterInput: RegisterInput): AuthResponse | Promise<AuthResponse>;
  login(LoginInput: LoginInput): AuthResponse | Promise<AuthResponse>;
  refreshToken(token: string): AuthResponse | Promise<AuthResponse>;
  forgotPassword(forgotPasswordInput: ForgotPasswordInput): string | Promise<string>;
  resetPassword(resetPasswordInput: ResetPasswordInput): string | Promise<string>;
}

export type DateTime = any;
type Nullable<T> = T | null;
