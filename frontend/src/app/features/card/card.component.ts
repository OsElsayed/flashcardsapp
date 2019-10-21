import { DeleteCard } from 'src/app/data-store/card/card.actions';
import { Card } from 'src/app/models/card.interface';
import { EditCardMode } from './../../data-store/layout/layout.actions';
import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DataStoreState } from 'src/app/data-store/data-store.reducer';
import { Observable } from 'rxjs';
import { CardMode, selectLayoutCardMode } from 'src/app/data-store/layout';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() indexCard: number;
  @Input() card: Card;

  mode$: Observable<CardMode>;
  constructor(private store: Store<DataStoreState>) {
    this.mode$ = store.pipe(select(selectLayoutCardMode));

  }

  ngOnInit() {
    console.log(this.card);
  }

  editCard() {
    this.store.dispatch(EditCardMode({ index: this.indexCard }));
  }

  deleteCard() {
    this.store.dispatch(DeleteCard({ index: this.indexCard }));

  }
}
