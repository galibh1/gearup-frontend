export type UserRole =
  | "CUSTOMER"
  | "PROVIDER"
  | "ADMIN";


export interface User {

  id:string;

  name:string;

  email:string;

  role:UserRole;

}


export interface LoginPayload {

  email:string;

  password:string;

}


export interface RegisterPayload {

  name:string;

  email:string;

  password:string;

}