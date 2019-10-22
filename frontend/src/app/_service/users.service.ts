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

  updateUserById(userId: string, usersData) {
    return this.http.put('http://localhost:3000/users/' + userId, usersData);
  }

  getUserCardsById(userId: string) {
    return this.http.get('http://localhost:3000/users/' + userId);
  }

  DeleteUser(userId: string) {
    return this.http.delete('http://localhost:3000/users/' + userId);
  }

  getCurrentUserData(userId: string) {
    //console.log(userId);
    return this.http.get('http://localhost:3000/users/' + userId);
  }

  getCurrentUserCards(email: string) {
    //console.log(userId);
    return this.http.get('http://localhost:3000/users/email/' + email);
  }

  getListUsers() {
    return this.http.get('http://localhost:3000/users/');
  }

  UpdateUserUsingEmail(email: string, userData) {
    return this.http.put('http://localhost:3000/users/update/status', userData);
  }

}
