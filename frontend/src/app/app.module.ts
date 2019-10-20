import { LayoutModule } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainBarComponent } from './main-bar/main-bar.component';
import { SignupComponent } from './signup/signup.component';
import { TokenInterceptor } from './token.interceptor';
import { AuthService } from './_service/auth.service';
import { UsersService } from './_service/users.service';

const MY_ROUTE: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    MainBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(MY_ROUTE),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatSidenavModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatRadioModule,
    FormsModule,
    MatSelectModule,
    MatGridListModule,
    MatTableModule,
    MatMenuModule
  ],
  providers: [AuthService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthGuard, UsersService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
