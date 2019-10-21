import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { tokenName } from "@angular/compiler";
import { of, Observable } from "rxjs";
import { catchError, mapTo, tap } from "rxjs/operators";
import { config } from "./../config";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  currentUser: any;
  helper = new JwtHelperService();

  private readonly JWT_TOKEN = "JWT_TOKEN";

  constructor(private http: HttpClient) {
    let token = localStorage.token;
    if (token) {
      this.currentUser = this.helper.decodeToken(token);
    }
  }

  login(user: { email: string; password: string }): Observable<any> {
    return this.http
      .post<any>(`${config.apiUrl}/users/login`, user, { observe: "response" })
      .pipe(
        tap(response => {
          console.log("The header is: " + response.headers.get("auth-token"));
          this.doLoginUser(user.email, response.body.token);
          console.log(response);
          return of(response.body.msg);
        }),
        catchError(error => {
          return of(error.error.msg);
        })
      );

    //return of("success");
  }

  private doLoginUser(email: string, token: String) {
    this.currentUser = email;
    this.storeTokens(token);
  }

  private doLogoutUser() {
    this.currentUser = null;
    this.removeTokens();
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  private storeTokens(token: String) {
    localStorage.setItem(this.JWT_TOKEN, JSON.stringify(token));
  }

  isLoggedIn() {
    if (!localStorage.getItem(this.JWT_TOKEN)) return false;
    return true;
  }

  logout() {
    this.doLogoutUser();
  }
}
