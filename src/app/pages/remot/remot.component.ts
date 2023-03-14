import { Component, OnInit } from '@angular/core';
import { Remote } from 'src/app/shared/models/Remote'; 
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
import { RemoteService } from 'src/app/shared/services/remote.service';
import { AuthService } from "src/app/shared/services/auth.service";
@Component({
  selector: 'app-remot',
  templateUrl: './remot.component.html',
  styleUrls: ['./remot.component.scss']
})
export class RemotComponent implements OnInit {

  remotes: Remote[] = [];
  remoteCopy: Remote[] = [];
  closeResult = "";
  modalOptions: NgbModalOptions;
  deleteAlertMessage: string = "";
  successMessage: string = "";
  errorMessage: string = "";
  remoteToDelete: Remote;
  isLoading = false;
  permissions: string[] = [];

  itemsPerPage: number = 10;
  currentPage: number = 1;

  hasFilter: boolean = false;
  users: any;

  constructor(
    private remoteService: RemoteService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
    };
  }
  ngOnInit(): void {
    this.getRemotes();
    this.permissions = this.authService.getPermissions();
  }

  hasPermission(permission: string) {
    return this.permissions.includes(permission);
  }
  

  getRemotes() {
    this.isLoading = true;
    this.hasFilter = false;
    this.remoteService.getRemotes().subscribe({
      next: (remotes: Remote[]) => {
        this.isLoading = false;
        this.remotes = remotes;
        this.remoteCopy = [...this.remotes];
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

  open(content, remote: Remote) {
    this.deleteAlertMessage = `Are you sure you want to delete ${remote.type} ${remote.Date}`;
    this.remoteToDelete = remote;
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
  deleteRemote() {
    this.isLoading = true;
    this.remoteService.deleteRemote(this.remoteToDelete.id).subscribe({
      next: (response: { message: string }) => {
        this.successMessage = "demande deleted successfully";
        this.getRemotes();
        setTimeout(() => {
          this.successMessage = "";
        }, 5000);
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


  // search(event: any) {
  //   let search = event.target.value;
  //   this.hasFilter = search ? true : false;
  //   this.remotes = [...this.remoteCopy];
  //   this.remotes = this.remotes.filter(
  //     (remote) =>
  //     remote.firstName.includes(search) ||
  //     remote.lastName.includes(search)     
  //   );
  // }


  
 
  
  }
