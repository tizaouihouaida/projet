import { Routes } from "@angular/router";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { RadacctComponent } from "../../pages/radacct/radacct.component";
import { UsersComponent } from "src/app/pages/users/users.component";
import { RolesComponent } from "src/app/pages/roles/roles.component";
import { AddUserComponent } from "src/app/pages/add-user/add-user.component";
import { AddRoleComponent } from "src/app/pages/add-role/add-role.component";
import { PermissionGuard } from "src/app/shared/guards/permission.guard";
import { FirstConnexionComponent } from "src/app/pages/first-connexion/first-connexion.component";
import { SuspenssionComponent } from "src/app/pages/suspenssion/suspenssion.component";
import { ModemComponent } from "src/app/pages/modem/modem.component";
import { CustomersComponent } from "src/app/pages/customers/customers.component";
import { AddCustomerComponent } from "src/app/pages/add-customer/add-customer.component";
import { ReactivationComponent } from "src/app/pages/reactivation/reactivation.component";
import { DepartementComponent} from "src/app/pages/departement/departement.component";
import { AddDepartementComponent } from "src/app/pages/add-departement/add-departement.component";
import { RemoteComponent } from "src/app/pages/remote/remote.component";
import { AddRemoteComponent } from "src/app/pages/add-remote/add-remote.component";
import { RemotComponent } from "src/app/pages/remot/remot.component";
export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  {
    path: "users",
    component: UsersComponent,
    canActivate: [PermissionGuard],
    data: { permission: "PERMISSION_LIST_USERS" },
  },
  { path: "add-user", component: AddUserComponent },
  { path: "edit-user/:id", component: AddUserComponent },
  { path: "roles", component: RolesComponent },
  { path: "add-role", component: AddRoleComponent },
  { path: "edit-role/:id", component: AddRoleComponent },
  { path: "radacct", component: RadacctComponent },
  { path: "suspension", component: SuspenssionComponent },
  { path: "reactivation", component: ReactivationComponent },
  { path: "first-connexion", component: FirstConnexionComponent },
  { path: "modem", component: ModemComponent },
  { path: "customers", component: CustomersComponent },
  { path: "add-customer", component: AddCustomerComponent },
  { path: "edit-customer/:id", component: AddCustomerComponent },
  { path: "departement", component: DepartementComponent },
  { path: "add-departement", component: AddDepartementComponent },
  { path: "edit-departement/:id", component: AddDepartementComponent },
  { path: "remote", component: RemoteComponent },
  { path: "add-remote", component: AddRemoteComponent },
  { path: "edit-remote/:id", component: AddRemoteComponent },
  { path: "remot", component: RemotComponent },
  

];
