import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Observable } from "rxjs";

import { Departement } from 'src/app/shared/models/Departement';
import { Role } from 'src/app/shared/models/Role';
import { Departementservice } from 'src/app/shared/services/departement.service';
@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrls: ['./add-departement.component.scss']
})
export class AddDepartementComponent implements OnInit {
  errorMessage: string = "";
  successMessage: string = "";
  departements: Departement;
  departementForm: FormGroup;
  mode: string = "create";
  departementId: number;
  isLoading = false;
  isSubmit: boolean = false;
  departement: any;
  roleService: any;
  roles: Role[];
  constructor(
    
    private departementService: Departementservice,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {
    this.initDepartementForm();
    this.checkMode();

  }
  initDepartementForm() {
    this.departementForm = this.fb.group({
      name: [null, [Validators.required]],
    
    });
  }

  
  checkMode() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.departementId = +paramMap.get("id");
        this.mode = "edit";
        this.getDepartementById(this.departementId);
      } else {
        this.mode = "create";
        this.departementForm.addControl(
          "name",
          new FormControl("", Validators.required)
        );
        this.departementId = null;
      }
    });
  }
  getDepartementById(id: number) {
    this.isLoading = true;
    this.departementService.getDepartementById(id).subscribe({
      next: (departement: Departement) => {
        this.isLoading = false;
        this.departement = departement;
        this.patchDepartementForm();
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

  patchDepartementForm() {
    this.departementForm.patchValue({
      name: this.departement.name,
      
    });
  }

  saveDepartement() {
    this.isLoading = true;
    this.isSubmit = true;
    if (this.departementForm.invalid) {
      this.isLoading = false;
      return;
    }
    if (this.mode === "create") {
      this.departementService.createDepartement(this.departementForm.value).subscribe({
        next: (response: { message: string }) => {
          this.isLoading = false;
          this.router.navigate(["/departement"]);
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
      this.departementService.editDepartement(this.departementId, this.departementForm.value).subscribe({
        next: (response: {message: string}) => {
          this.isLoading = false;
          this.router.navigate(["/departement"]);
        },
        error: (error) => {
          this.isLoading = false;
          if (error.error.message === "user_exist") {
            
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