import { selectLayoutCardMode, selectLayoutIndexEdit } from './../../data-store/layout/layout.selector';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatChipInputEvent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Hint } from 'src/app/models/hint.interface';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Store, select } from '@ngrx/store';
import { AddCard, DeleteCard, EditCard } from 'src/app/data-store/card/card.actions';
import { Card } from 'src/app/models/card.interface';
import { LayoutState, CardMode } from 'src/app/data-store/layout/layout.reducer';
import { Observable, VirtualTimeScheduler } from 'rxjs';
import { DataStoreState } from 'src/app/data-store/data.reducer';
import { selectCardByIndex } from 'src/app/data-store/card/card.selector';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {
  mode$: Observable<CardMode>;
  indexEdit$: Observable<number>;
  indexEdit: number = 0;
  currentCard$: Observable<Card>;
  constructor(
    private fb: FormBuilder,
    private store: Store<DataStoreState>,
    public dialogRef: MatDialogRef<CardFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { card: Card, index: number }) {
    this.cardForm = this.fb.group({
      'cardname': ['', [
        Validators.required,
      ]],
      'front': ['', Validators.required],
      'back': ['', Validators.required],
      'type': ['', Validators.required],
      'hints': ['', Validators.required]
    });
    console.log("this.data");
    console.log(this.data);
    if (this.data) {
      this.cardForm.patchValue(this.data.card, { emitEvent: false });
      this.indexEdit = this.data["index"];
    }
  }

  ngOnInit() {
    this.mode$ = this.store.pipe(select(selectLayoutCardMode));
  }

  cardForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  hints: Hint[] = [];
  types: string[] = ['code', 'text'];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our hint
    if ((value || '').trim()) {
      this.hints.push({ hint: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(hint: Hint): void {
    const index = this.hints.indexOf(hint);

    if (index >= 0) {
      this.hints.splice(index, 1);
    }
  }

  addCard() {
    const card: Card = { ...this.cardForm.value, hints: this.hints };
    this.store.dispatch(AddCard({ card: card }));
  }

  editCard() {
    const card: Card = { ...this.cardForm.value, hints: this.hints };
    this.store.dispatch(EditCard({ index: this.indexEdit, card: card }));
  }
}