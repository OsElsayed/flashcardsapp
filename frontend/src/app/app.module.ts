import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FlipModule } from 'ngx-flip';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { dataStoreReducer, effects } from './data-store';
import { CardFormComponent } from './features/card-form/card-form.component';
import { CardComponent } from './features/card/card.component';
import { OverviewComponent } from './features/overview/overview.component';
import { FlipComponent } from './flip/flip.component';
import { HomeComponent } from './home/home.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { LoginComponent } from './login/login.component';
import { MainBarComponent } from './main-bar/main-bar.component';
import { SignupComponent } from './signup/signup.component';
import { TokenInterceptor } from './token.interceptor';
import { AuthService } from './_service/auth.service';
import { UsersService } from './_service/users.service';

const MY_ROUTE: Routes = [
  { path: '', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'review', component: FlipComponent },
  { path: "users", component: ListUsersComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    MainBarComponent,
    CardComponent,
    OverviewComponent,
    CardFormComponent,
    FlipComponent,
    ListUsersComponent
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
    MatMenuModule,
    StoreModule.forRoot(dataStoreReducer),
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatChipsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    FlipModule,
    CommonModule,
    EffectsModule.forRoot(effects)
  ],
  providers: [AuthService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthGuard, UsersService, DatePipe],

  entryComponents: [CardFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
