import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_service/users.service';
import { AuthService } from '../_service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'status'];
  dataSource: any;

  userLogged: boolean;
  
  constructor(private userService: UsersService, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.userLogged=this.authService.isLoggedIn();
    if(this.userLogged){
      const result = this.userService.getListUsers().subscribe(result => {
        result
        console.log(result )
        this.dataSource  = result;
      }, error =>{
        alert(error)
      });
    }else{
      this.dataSource=[];
    }
  }

isUserLogged(): boolean{
  return this.authService.isLoggedIn();
}

  updateUserStatus(email: string, status: boolean){
    console.log(email, status);

    const userDataList = this.dataSource.filter(item => item.email === email);
    let userData;
    if(userDataList){
      userData = userDataList[0];
    }

    if(userData){
      userData.status = status;
      this.userService.UpdateUserUsingEmail(email, userData).subscribe(result => {
        result
        this.toastr.success("Update Success!", "Enable/Disable Roles");
      }, error => {
          this.toastr.error("Update Failed!", "Enable/Disable Roles");
          userData.status = !status;
      });
    }
    
  }

}
