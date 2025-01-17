
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    SUPERADMIN = "SUPERADMIN",
    SUB_ADMIN = "SUB_ADMIN",
    LOCAL_ADMIN = "LOCAL_ADMIN"
}

export interface AddUserArgs {
    role?: Nullable<Role>;
    head_id?: Nullable<number>;
    member_code?: Nullable<string>;
    email_address?: Nullable<string>;
    mobile?: Nullable<string>;
    plain_password?: Nullable<string>;
    password?: Nullable<string>;
    relationship_id?: Nullable<number>;
    sub_community_id?: Nullable<number>;
    local_community_id?: Nullable<number>;
    first_name?: Nullable<string>;
    last_name_id?: Nullable<number>;
    father_name?: Nullable<string>;
    mother_name?: Nullable<string>;
    status: boolean;
    gender?: Nullable<string>;
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
    profile_password?: Nullable<string>;
    profile_percent: number;
}

export interface UpdateUserArgs {
    id: number;
    role?: Nullable<Role>;
    head_id?: Nullable<number>;
    member_code?: Nullable<string>;
    email_address?: Nullable<string>;
    mobile?: Nullable<string>;
    plain_password?: Nullable<string>;
    password?: Nullable<string>;
    relationship_id?: Nullable<number>;
    sub_community_id?: Nullable<number>;
    local_community_id?: Nullable<number>;
    first_name?: Nullable<string>;
    last_name_id?: Nullable<number>;
    father_name?: Nullable<string>;
    mother_name?: Nullable<string>;
    status: boolean;
    gender?: Nullable<string>;
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
    profile_password?: Nullable<string>;
    profile_percent: number;
}

export interface User {
    id: number;
    role: Role;
    head_id?: Nullable<number>;
    member_code?: Nullable<string>;
    email_address?: Nullable<string>;
    mobile?: Nullable<string>;
    plain_password?: Nullable<string>;
    password?: Nullable<string>;
    relationship_id?: Nullable<number>;
    sub_community_id?: Nullable<number>;
    local_community_id?: Nullable<number>;
    first_name?: Nullable<string>;
    last_name_id?: Nullable<number>;
    father_name?: Nullable<string>;
    mother_name?: Nullable<string>;
    status: boolean;
    gender?: Nullable<string>;
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
    profile_password?: Nullable<string>;
    profile_percent: number;
}

export interface IQuery {
    securedResourceforUser(): string | Promise<string>;
    securedResourceforAdmin(): string | Promise<string>;
    login(mobile: string, password: string): string | Promise<string>;
    getAllUsers(): User[] | Promise<User[]>;
    findUserById(userId: number): User | Promise<User>;
    findUserByMobile(mobile: string): User | Promise<User>;
}

export interface IMutation {
    deleteUserById(userId: number): string | Promise<string>;
    addUser(addUserArgs: AddUserArgs): string | Promise<string>;
    updateUser(updateUserArgs: UpdateUserArgs): string | Promise<string>;
}

export type DateTime = any;
type Nullable<T> = T | null;
