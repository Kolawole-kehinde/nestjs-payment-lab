import { Role } from "./role.enum.js";

export interface AuthenticatedUser {
  sub: string;
  role: Role;
}