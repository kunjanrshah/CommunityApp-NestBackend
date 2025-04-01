
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum AddrType {
    OWN = "OWN",
    RENTED = "RENTED"
}

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

export interface GetInactiveUsersInput {
    start?: Nullable<number>;
    limit?: Nullable<number>;
    subCommunityId?: Nullable<number>;
    localCommunityId?: Nullable<number>;
}

export interface StatisticsInputDto {
    cityId?: Nullable<number>;
    subCommunityId?: Nullable<number>;
    localCommunityId?: Nullable<number>;
}

export interface SearchInput {
    start: number;
    length: number;
    filterBy?: Nullable<string>;
}

export interface SearchRequestDTO {
    start: number;
    length: number;
    filter_by?: Nullable<SmartFilterDto>;
}

export interface SmartFilterDto {
    last_name_id?: Nullable<number>;
    local_community_id?: Nullable<number>;
    sub_community_id?: Nullable<number>;
    native_place_id?: Nullable<number>;
    city_id?: Nullable<number>;
    member_code?: Nullable<string>;
    head_name?: Nullable<string>;
    first_name?: Nullable<string>;
    father_name?: Nullable<string>;
    mother_name?: Nullable<string>;
    gender?: Nullable<boolean>;
    marital_status?: Nullable<string>;
    min_age?: Nullable<number>;
    max_age?: Nullable<number>;
    min_height?: Nullable<number>;
    max_height?: Nullable<number>;
    min_weight?: Nullable<number>;
    max_weight?: Nullable<number>;
    min_percentage?: Nullable<number>;
    max_percentage?: Nullable<number>;
    state_id?: Nullable<number>;
    email_address?: Nullable<string>;
    mobile?: Nullable<string>;
    local_address?: Nullable<string>;
    address?: Nullable<string>;
    pincode?: Nullable<string>;
    area?: Nullable<string>;
    business_address?: Nullable<string>;
    education_id?: Nullable<number>;
    gotra_id?: Nullable<number>;
    business_category_id?: Nullable<number>;
    occupation_id?: Nullable<number>;
    birth_place_id?: Nullable<number>;
    birth_date?: Nullable<string>;
    marriage_date?: Nullable<string>;
    expire_date?: Nullable<string>;
    updated_dt?: Nullable<string>;
    blood_group?: Nullable<string>;
    is_donor?: Nullable<boolean>;
    is_rented?: Nullable<boolean>;
    is_expired?: Nullable<boolean>;
    is_spect?: Nullable<boolean>;
    matrimony?: Nullable<boolean>;
    is_shani?: Nullable<boolean>;
    is_mangal?: Nullable<boolean>;
}

export interface GetNearbyUsersInput {
    lat: number;
    lng: number;
    km: number;
    nearBy?: Nullable<string>;
    start?: Nullable<number>;
    length?: Nullable<number>;
    subCommunityId?: Nullable<number>;
}

export interface ChangePasswordInput {
    currentPassword: string;
    newPassword: string;
}

export interface UpsertUserInput {
    user_id?: Nullable<number>;
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
    states_id?: Nullable<number>;
    addr_type: AddrType;
    address?: Nullable<string>;
    area?: Nullable<string>;
    pincode?: Nullable<string>;
    local_address?: Nullable<string>;
    mosaad_id?: Nullable<number>;
    is_donor: boolean;
    matrimony: boolean;
    birth_date?: Nullable<DateTime>;
    native_place_id?: Nullable<number>;
    blood_group?: Nullable<string>;
    current_activity_id?: Nullable<number>;
    marital_status?: Nullable<string>;
    marriage_date?: Nullable<DateTime>;
    gotra_id?: Nullable<number>;
    business_category_id?: Nullable<number>;
    business_address?: Nullable<string>;
    business_logo?: Nullable<string>;
    company_name?: Nullable<string>;
    website?: Nullable<string>;
    work_details?: Nullable<string>;
    birth_time?: Nullable<string>;
    birth_place_id?: Nullable<number>;
    hobby?: Nullable<string>;
    about_me?: Nullable<string>;
    weight?: Nullable<number>;
    height?: Nullable<number>;
    is_spect: boolean;
    is_mangal: boolean;
    is_shani: boolean;
    facebook_profile?: Nullable<string>;
    expectation?: Nullable<string>;
}

export interface ChangeRoleInput {
    idList: number[];
    role: string;
    subCommunityId?: Nullable<number>;
    localCommunityId?: Nullable<number>;
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
    states_id: number;
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

export interface UserAddressDTO {
    id: number;
    user_id: number;
    address: string;
    city_id: number;
    states_id: number;
    local_address?: Nullable<string>;
    mosaad_id?: Nullable<number>;
    area?: Nullable<string>;
    pincode?: Nullable<string>;
    addr_type: AddrType;
}

export interface UserMatrimonyDTO {
    id?: Nullable<number>;
    user_id: number;
    birth_time?: Nullable<string>;
    birth_place_id: number;
    hobby: string;
    about_me?: Nullable<string>;
    weight?: Nullable<number>;
    height?: Nullable<number>;
    is_spect: boolean;
    is_mangal: boolean;
    is_shani: boolean;
    facebook_profile?: Nullable<string>;
    expectation?: Nullable<string>;
}

export interface UserPersonalDetailDTO {
    id: number;
    user_id: number;
    is_donor: boolean;
    matrimony: boolean;
    birth_date?: Nullable<DateTime>;
    native_place_id?: Nullable<number>;
    blood_group?: Nullable<string>;
    current_activity_id?: Nullable<number>;
    marital_status?: Nullable<string>;
    marriage_date?: Nullable<DateTime>;
    gotra_id?: Nullable<number>;
}

export interface UserWorkDetailDTO {
    id: number;
    user_id: number;
    business_category_id?: Nullable<number>;
    business_address?: Nullable<string>;
    business_logo?: Nullable<string>;
    company_name?: Nullable<string>;
    website?: Nullable<string>;
    work_details?: Nullable<string>;
}

export interface UserDTO {
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
    updated?: Nullable<DateTime>;
    userAddress?: Nullable<UserAddressDTO>;
    userMatrimony?: Nullable<UserMatrimonyDTO>;
    userPersonalDetail?: Nullable<UserPersonalDetailDTO>;
    userWorkDetail?: Nullable<UserWorkDetailDTO>;
    matchedFields?: Nullable<string[]>;
    distance?: Nullable<string>;
    nearBy?: Nullable<string>;
}

export interface ChangePasswordResponse {
    message: string;
}

export interface MasterDTO {
    id: string;
    name: string;
}

export interface GetMastersResponseDTO {
    success: boolean;
    message?: Nullable<string>;
    data: MasterDTO[];
    deleted: string[];
    last_updated: number;
}

export interface CityDto {
    id: number;
    name: string;
    count: number;
}

export interface CityResponseDto {
    data?: Nullable<CityDto[]>;
    deleted?: Nullable<number[]>;
    last_updated?: Nullable<string>;
}

export interface StatisticsDataDto {
    TotalFamily: number;
    TotalMembers: number;
    TotalMale: number;
    TotalFemale: number;
    TotalUnmarriedMale: number;
    TotalUnmarriedFemale: number;
    TotalInterestedMale: number;
    TotalInterestedFemale: number;
}

export interface StatisticsResponseDto {
    success: boolean;
    data: StatisticsDataDto;
}

export interface SearchResult {
    totalRecords: number;
    members: UserDTO[];
}

export interface IQuery {
    getFamilyMembers(head_id: number): UserDTO[] | Promise<UserDTO[]>;
    usersByDateRange(fromDate: string, toDate: string, page: number, limit: number): UserDTO[] | Promise<UserDTO[]>;
    getInactiveUsers(input: GetInactiveUsersInput): UserDTO[] | Promise<UserDTO[]>;
    getSharedProfiles(userId: number): UserDTO[] | Promise<UserDTO[]>;
    getSharingProfiles(userId: number): UserDTO[] | Promise<UserDTO[]>;
    getCities(date?: Nullable<string>): GetMastersResponseDTO | Promise<GetMastersResponseDTO>;
    getStates(date?: Nullable<string>): GetMastersResponseDTO | Promise<GetMastersResponseDTO>;
    getBusinessCategories(date?: Nullable<string>): GetMastersResponseDTO | Promise<GetMastersResponseDTO>;
    getCommittees(date?: Nullable<string>): GetMastersResponseDTO | Promise<GetMastersResponseDTO>;
    getEducations(date?: Nullable<string>): GetMastersResponseDTO | Promise<GetMastersResponseDTO>;
    getRelations(date?: Nullable<string>): GetMastersResponseDTO | Promise<GetMastersResponseDTO>;
    getGotras(date?: Nullable<string>): GetMastersResponseDTO | Promise<GetMastersResponseDTO>;
    getSubCasts(date?: Nullable<string>): GetMastersResponseDTO | Promise<GetMastersResponseDTO>;
    getCitiesByState(stateId: number, date?: Nullable<string>, subCommunityId?: Nullable<number>): CityResponseDto | Promise<CityResponseDto>;
    getStatistics(input: StatisticsInputDto): StatisticsResponseDto | Promise<StatisticsResponseDto>;
    smartSearch(input: SearchInput): SearchResult | Promise<SearchResult>;
    smartFilter(input: SearchRequestDTO): SearchResult | Promise<SearchResult>;
    nearByUsers(filter: GetNearbyUsersInput): SearchResult | Promise<SearchResult>;
    isAppVersionExists(version: number): boolean | Promise<boolean>;
}

export interface IMutation {
    changePassword(ChangePasswordInput: ChangePasswordInput): ChangePasswordResponse | Promise<ChangePasswordResponse>;
    upsertUser(upsertUserInput: UpsertUserInput): UserDTO | Promise<UserDTO>;
    updateLastLogin(user_id: number): boolean | Promise<boolean>;
    deleteUserById(userId: number): string | Promise<string>;
    changeRole(input: ChangeRoleInput): string | Promise<string>;
    register(RegisterInput: RegisterInput): AuthResponse | Promise<AuthResponse>;
    login(LoginInput: LoginInput): AuthResponse | Promise<AuthResponse>;
    refreshToken(token: string): AuthResponse | Promise<AuthResponse>;
    forgotPassword(forgotPasswordInput: ForgotPasswordInput): string | Promise<string>;
    resetPassword(resetPasswordInput: ResetPasswordInput): string | Promise<string>;
}

export type DateTime = any;
type Nullable<T> = T | null;
