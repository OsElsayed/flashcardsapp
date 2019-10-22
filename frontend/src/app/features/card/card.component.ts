import { DeleteCard } from 'src/app/data-store/card/card.actions';
import { Card } from 'src/app/models/card.interface';
import { EditCardMode } from './../../data-store/layout/layout.actions';
import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DataStoreState } from 'src/app/data-store/data.reducer';
import { Observable } from 'rxjs';
import { CardMode, selectLayoutCardMode } from 'src/app/data-store/layout';
import { MatDialog } from '@angular/material';
import { CardFormComponent } from '../card-form/card-form.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() indexCard: number;
  @Input() card: Card;

  mode$: Observable<CardMode>;
  constructor(public dialog: MatDialog, private store: Store<DataStoreState>) {
    this.mode$ = store.pipe(select(selectLayoutCardMode));

  }

  ngOnInit() {
    console.log(this.card);
    console.log(this.indexCard);

  }

  editCard() {
    const dialogRef = this.dialog.open(CardFormComponent, {
      width: '550px',
      data: { card: this.card, index: this.indexCard }
    });
    console.log(this.indexCard);
    console.log(this.card);

    dialogRef.afterOpen().subscribe(() => {
      this.store.dispatch(EditCardMode({ index: this.indexCard }));
    });
  }

  deleteCard() {
    this.store.dispatch(DeleteCard({ index: this.indexCard }));

  }

}
