import { PermissionKeys } from "./authorization/permisos-key";
import { securityId } from "@loopback/security";

export interface RequiredPermissions {
  required: PermissionKeys[];
}


export interface MyUserProfile {
  [securityId]: string;
  email?: string;
  name: string;
  permissions: PermissionKeys[];

}
