import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CardFormComponent } from '../card-form/card-form.component';
import { Store, select } from '@ngrx/store';
import { DataStoreState } from 'src/app/data-store/data-store.reducer';
import { Card } from 'src/app/models/card.interface';
import { selectCards, selectCardState } from 'src/app/data-store/card/card.selector';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  cards$: Observable<Card[]>;
  constructor(public dialog: MatDialog, private store: Store<DataStoreState>) {

    store.pipe(select(selectCardState)).subscribe(val => {
      console.log(val);
    })
    this.cards$ = store.pipe(select(selectCards));

  }

  ngOnInit() {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CardFormComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
