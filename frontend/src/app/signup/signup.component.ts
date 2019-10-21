import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../_service/auth.service";
import { UsersService } from "../_service/users.service";
import { PasswordMatcher } from "./matcher";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  userForm: FormGroup;
  public userData;
  public matcher = new PasswordMatcher();

  constructor(
    public formBuilder: FormBuilder,
    public us: UsersService,
    private au: AuthService,
    public rt: Router,
    private toastr: ToastrService
  ) {
    this.userForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$")
        ]
      ],
      passwordGroup: this.formBuilder.group(
        {
          password: [
            "",
            [
              Validators.required,
              Validators.pattern("(?=.*[a-z])(?=.*[0-9])[A-Za-zd$@$!%*?&].{6,}")
            ]
          ],
          confirmPassword: ["", [Validators.required]]
        },
        { validator: this.confirmPasswordValidator }
      ),
      firstName: ["", Validators.required],
      lastName: ["", Validators.required]
    });
  }

  ngOnInit() {}

  // onSubmit2() {
  //   console.log("Submitting ....");
  //   this.userForm.value.password = this.userForm.value.passwordGroup.password;
  //   console.log(this.userForm.value);

  //   this.us.registerNewUser(this.userForm.value).subscribe(res => {
  //     this.toastr.success("User Created", "Users");
  //     this.rt.navigateByUrl("/login");
  //   });
  // }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.us
      .addNewUser({
        email: this.f.email.value,
        password: this.userForm.value.passwordGroup.password,
        firstName: this.f.firstName.value,
        lastName: this.f.lastName.value
      })
      .subscribe(
        success => {
          if (success) {
            this.toastr.success(success, "Authentication");
            this.rt.navigate(["/"]);
          }
        },
        error => {
          if (error) {
            this.toastr.error(error, "Authentication");
            this.rt.navigate(["/login"]);
          }
        }
      );
  }

  confirmPasswordValidator(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  }
}
