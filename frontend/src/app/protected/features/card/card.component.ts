import { DeleteCard } from 'src/app/card-store/card/card.actions';
import { Card } from 'src/app/models/card.interface';
import { EditCardMode } from '../../../card-store/layout/layout.actions';
import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DataStoreState } from 'src/app/card-store/data.reducer';
import { Observable } from 'rxjs';
import { CardMode, selectLayoutCardMode } from 'src/app/card-store/layout';
import { MatDialog } from '@angular/material';
import { CardFormComponent } from '../card-form/card-form.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() indexCard: number;
  @Input() card: Card;

  mode$: Observable<CardMode>;
  constructor(public dialog: MatDialog, private store: Store<DataStoreState>) {
    this.mode$ = store.pipe(select(selectLayoutCardMode));

  }

  editCard() {
    const dialogRef = this.dialog.open(CardFormComponent, {
      width: '550px',
      data: { card: this.card, index: this.indexCard, mode: CardMode.EDIT }
    });

    dialogRef.afterOpen().subscribe(() => {
      this.store.dispatch(EditCardMode({ index: this.indexCard }));
    });
  }

  deleteCard() {
    this.store.dispatch(DeleteCard({ index: this.indexCard }));

  }
  flipStatus = false;
  flipCard() {
    this.flipStatus = !this.flipStatus;
  }

}
