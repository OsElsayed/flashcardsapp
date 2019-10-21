import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public myHeaders: any;

  constructor(public http: HttpClient) {
    this.myHeaders = new Headers();
    this.myHeaders.append('Content-Type', 'application/json');
  }

  registerNewUser(usersData) {
    return this.http.post('http://localhost:3000/users/signup', usersData);
  }

  UpdateUser(userId: string, usersData) {
    return this.http.put('http://localhost:3000/users/' + userId, usersData);
  }

  DeleteUser(userId: string) {
    return this.http.delete('http://localhost:3000/users/' + userId);
  }

  getCurrentUserData(userId: string) {
    //console.log(userId);
    return this.http.get('http://localhost:3000/users/' + userId);
  }

}
