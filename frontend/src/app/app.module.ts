import { LayoutModule } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatTableModule, MatToolbarModule, MatChipsModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { CardComponent } from './features/card/card.component';
import { OverviewComponent } from './features/overview/overview.component';
import { CardFormComponent } from './features/card-form/card-form.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainBarComponent } from './main-bar/main-bar.component';
import { SignupComponent } from './signup/signup.component';
import { TokenInterceptor } from './token.interceptor';
import { AuthService } from './_service/auth.service';
import { UsersService } from './_service/users.service';
import { dataReducer } from './data-store/card/card.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { layoutReducer } from './data-store/layout/layout.reducer';
import { ListUsersComponent } from './list-users/list-users.component';
import { dataStoreReducer, effects } from './data-store';
import { EffectsModule } from '@ngrx/effects';

const MY_ROUTE: Routes = [
  { path: '', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
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
    EffectsModule.forRoot(effects)
  ],
  providers: [AuthService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthGuard, UsersService, DatePipe],

  entryComponents: [CardFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
