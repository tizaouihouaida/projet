import { Role } from "./Role";
import { Departement } from "./Departement";
export interface User {
  PhoneNumber: any;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isEnabled: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  RoleId: number;
  Role: Role;
  DepartementId: number;
  Departement: Departement;
  remote:String;
}
