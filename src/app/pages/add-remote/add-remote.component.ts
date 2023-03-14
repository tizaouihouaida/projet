import { Component, OnInit } from '@angular/core';
import { Remote} from 'src/app/shared/models/Remote';
import { RemoteService} from 'src/app/shared/services/remote.service';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
@Component({
  selector: 'app-add-remote',
  templateUrl: './add-remote.component.html',
  styleUrls: ['./add-remote.component.scss']
})
export class AddRemoteComponent implements OnInit {
  errorMessage: string = "";
  successMessage: string = "";
  remotes: Remote[] = [];
  remoteForm: FormGroup;
  mode: string = "create";
  isLoading = false;
  isSubmit: boolean = false;
  remoteId: number;
  remote: Remote;
  constructor(
    private remoteService: RemoteService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initUserForm();
    this.checkMode();
  }

  initUserForm() {
    this.remoteForm = this.fb.group({
      Date: [null, [Validators.required]],

    });
  }

  

  checkMode() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.remoteId = +paramMap.get("id");
        this.mode = "edit";
        this.getRemoteById(this.remoteId);
      } else {
        this.mode = "create";
        this.remoteForm.addControl(
          "Date",
          new FormControl("", Validators.required)
        );
        this.remoteId = null;
      }
    });
  }

  getRemoteById(id: number) {
    this.isLoading = true;
    this.remoteService.getRemoteById(id).subscribe({
      next: (remote: Remote) => {
        this.isLoading = false;
        this.remote = remote;
        this.patchRemoteForm();
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

  patchRemoteForm() {
    this.remoteForm.patchValue({
      Date: this.remote.Date,

    });
  }

  saveRemote() {
    this.isLoading = true;
    this.isSubmit = true;
    if (this.remoteForm.invalid) {
      this.isLoading = false;
      return;
    }
    if (this.mode === "create") {
      this.remoteService.createRemote(this.remoteForm.value).subscribe({
        next: (response: { message: string }) => {
          this.isLoading = false;
          this.router.navigate(["/remote"]);
        },
        error: (error) => {
          this.isLoading = false;
          
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        },
      });
    } else {
      this.remoteService.editRemote(this.remoteId, this.remoteForm.value).subscribe({
        next: (response: {message: string}) => {
          this.isLoading = false;
          this.router.navigate(["/remote"]);
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
