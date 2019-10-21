import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CardFormComponent } from '../card-form/card-form.component';
import { Store, select } from '@ngrx/store';
import { DataStoreState } from 'src/app/data-store/data.reducer';
import { Card } from 'src/app/models/card.interface';
import { selectCards, selectCardState } from 'src/app/data-store/card/card.selector';
import { AddCardMode } from 'src/app/data-store/layout';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  cards$: Observable<Card[]>;
  constructor(public dialog: MatDialog, private store: Store<DataStoreState>) {
    this.cards$ = store.pipe(select(selectCards));
  }

  ngOnInit() {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CardFormComponent, {
      width: '550px',
    });
    dialogRef.afterOpen().subscribe(() => {
      this.store.dispatch(AddCardMode());
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
