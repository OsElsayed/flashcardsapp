import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { ProtectedRoutingModule } from './protected-routing.module';
import { StoreModule } from '@ngrx/store';
import { dataStoreReducer, effects } from '../card-store';
import { CardComponent } from './features/card/card.component';
import { OverviewComponent } from './features/overview/overview.component';
import { CardFormComponent } from './features/card-form/card-form.component';
import { FlipModule } from 'ngx-flip';
import { ListUsersComponent } from '../list-users/list-users.component';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';
import { FlipComponent } from './features/flip/flip.component';
import { MatInputModule, MatButtonModule, MatFormFieldModule, MatCardModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatRadioModule, MatSelectModule, MatGridListModule, MatTableModule, MatMenuModule, MatSlideToggleModule, MatDialogModule, MatChipsModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'review', component: FlipComponent },
  { path: "users", component: ListUsersComponent }
];

@NgModule({
  declarations: [
    CardComponent,
    OverviewComponent,
    CardFormComponent,
    FlipComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    // ProtectedRoutingModule,
    StoreModule.forFeature('app', dataStoreReducer),
    EffectsModule.forFeature(effects),
    RouterModule.forChild(routes),
    FlipModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatSidenavModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    // LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatRadioModule,
    FormsModule,
    MatSelectModule,
    MatGridListModule,
    MatTableModule,
    MatMenuModule,
    // StoreModule.forRoot(dataStoreReducer),
    // StoreModule.forRoot({}),
    // EffectsModule.forRoot([]),

    // BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatChipsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    // FlipModule,
    CommonModule,
    // EffectsModule.forRoot(effects),
    //MatButtonToggleGroup,
    ReactiveFormsModule

  ],
  entryComponents: [CardFormComponent],
  // bootstrap: [OverviewComponent]
})
export class ProtectedModule { }
