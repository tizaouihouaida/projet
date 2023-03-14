import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Role } from "src/app/shared/models/Role";
import { User } from "src/app/shared/models/User";
import { RoleService } from "src/app/shared/services/role.service";
import { UserService } from "src/app/shared/services/user.service";
import { Departementservice } from "src/app/shared/services/departement.service";
import { Departement } from "src/app/shared/models/Departement";
@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent implements OnInit {
  errorMessage: string = "";
  successMessage: string = "";
  roles: Role[] = [];
  departements: Departement[] = [];
  user: User;
  userForm: FormGroup;
  mode: string = "create";
  userId: number;
  isLoading = false;
  isSubmit: boolean = false;
  constructor(
    private departementService : Departementservice,
    private roleService: RoleService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.initUserForm();
    this.checkMode();
    this.getDepartements();
  }

  initUserForm() {
    this.userForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      PhoneNumber: [null, [Validators.required]],
      remote: [null, [Validators.required]],
      isEnabled: [false, []],
      roleId: [null, [Validators.required]],
      departementId: [null, [Validators.required]],

    });
  }

  getRoles() {
    this.isLoading = true;
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        this.isLoading = false;
        this.roles = roles;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "An error occurred please connect the support";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      },
    });
  }

  getDepartements() {
    this.isLoading = true;
    this.departementService.getDepartements().subscribe({
      next: (departements: Departement[]) => {
        this.isLoading = false;
        this.departements = departements;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "An error occurred please connect the support";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      },
    });
  }

  checkMode() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.userId = +paramMap.get("id");
        this.mode = "edit";
        this.getUserById(this.userId);
      } else {
        this.mode = "create";
        this.userForm.addControl(
          "password",
          new FormControl("", Validators.required)
        );
        this.userId = null;
      }
    });
  }

  getUserById(id: number) {
    this.isLoading = true;
    this.userService.getUserById(id).subscribe({
      next: (user: User) => {
        this.isLoading = false;
        this.user = user;
        this.patchUserForm();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "An error occurred please connect the support";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      },
    });
  }

  patchUserForm() {
    this.userForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      PhoneNumber: this.user.PhoneNumber,
      remote: this.user.remote,
      isEnabled: this.user.isEnabled,
      roleId: this.user.RoleId,
      departementId: this.user.DepartementId,

    });
  }

  saveUser() {
    this.isLoading = true;
    this.isSubmit = true;
    if (this.userForm.invalid) {
      this.isLoading = false;
      return;
    }
    if (this.mode === "create") {
      this.userService.createUser(this.userForm.value).subscribe({
        next: (response: { message: string }) => {
          this.isLoading = false;
          this.router.navigate(["/users"]);
        },
        error: (error) => {
          this.isLoading = false;
          if (error.error.message === "user_exist") {
            this.errorMessage =
              "User email already exist please choose another email";
          } else {
            this.errorMessage =
              "An error occurred please try again or contact the support";
          }
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        },
      });
    } else {
      this.userService.editUser(this.userId, this.userForm.value).subscribe({
        next: (response: {message: string}) => {
          this.isLoading = false;
          this.router.navigate(["/users"]);
        },
        error: (error) => {
          this.isLoading = false;
          if (error.error.message === "user_exist") {
            this.errorMessage =
              "User email already exist please choose another email";
          } else {
            this.errorMessage =
              "An error occurred please try again or contact the support";
          }
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        }
      })
    }
  }
}
