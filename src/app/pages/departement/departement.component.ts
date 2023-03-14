import { Component, OnInit } from '@angular/core';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";

import { AuthService } from "src/app/shared/services/auth.service";
import { Departement } from 'src/app/shared/models/Departement';
import { Departementservice } from 'src/app/shared/services/departement.service';
@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {

  departements: Departement[] = [];
  departementCopy: Departement[] = [];
  closeResult = "";
  modalOptions: NgbModalOptions;
  deleteAlertMessage: string = "";
  successMessage: string = "";
  errorMessage: string = "";
  departementToDelete: Departement;
  isLoading = false;
  permissions: string[] = [];

  itemsPerPage: number = 10;
  currentPage: number = 1;

  hasFilter: boolean = false;
  users: any;

  constructor(
    private departementService: Departementservice,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
    };
  }
  ngOnInit(): void {
    this.getDepartements();
    this.permissions = this.authService.getPermissions();
  }

  hasPermission(permission: string) {
    return this.permissions.includes(permission);
  }
  

  getDepartements() {
    this.isLoading = true;
    this.hasFilter = false;
    this.departementService.getDepartements().subscribe({
      next: (departements: Departement[]) => {
        this.isLoading = false;
        this.departements = departements;
        this.departementCopy = [...this.departements];
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "An error occurred. Please contact the support";
        setTimeout(() => {
          this.errorMessage = "";
        });
      },
    });
  }

  deleteDepartement() {
    this.isLoading = true;
    this.departementService.deleteDepartement(this.departementToDelete.id).subscribe({
      next: (response: { message: string }) => {
        this.getDepartements();
      },
      error: (error) => {
        this.isLoading = false;
        if (error.error.message === "user_has_this_departement") {
          this.errorMessage =
            "can't delete this departement because exist user has it";
        } else {
          this.errorMessage =
            "An error occurred, Please try again or contact the support";
        }
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      },
    });
  }
  open(content, departement: Departement) {
    this.deleteAlertMessage = `Are you sure you want to delete ${departement.name} Departement`;
    this.departementToDelete = departement;
    this.modalService.open(content, this.modalOptions).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }



  search(event: any) {
    let search = event.target.value;
    this.hasFilter = search ? true : false;
    this.departements = [...this.departementCopy];
    this.departements = this.departements.filter(
      (departement) =>
      departement.name.includes(search) 
       
    );
  }


  
 
  
  }
