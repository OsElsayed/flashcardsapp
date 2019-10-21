import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { config } from "./../config";
import { catchError, mapTo, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  public myHeaders: any;

  constructor(public http: HttpClient) {
    this.myHeaders = new Headers();
    this.myHeaders.append("Content-Type", "application/json");
  }

  registerNewUser(usersData) {
    return this.http.post("http://localhost:3000/users/signup", usersData);
  }

  addNewUser(user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Observable<string> {
    return this.http.post<any>(`${config.apiUrl}/users/signup`, user).pipe(
      tap(response => {
        return of(response.msg);
      }),
      catchError(error => {
        return of(error.error.msg);
      })
    );
  }

  UpdateUser(userId: string, usersData) {
    return this.http.put("http://localhost:3000/users/" + userId, usersData);
  }

  DeleteUser(userId: string) {
    return this.http.delete("http://localhost:3000/users/" + userId);
  }

  getCurrentUserData(userId: string) {
    //console.log(userId);
    return this.http.get("http://localhost:3000/users/" + userId);
  }
}
