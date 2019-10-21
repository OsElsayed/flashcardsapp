import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { Hint } from 'src/app/models/hint.interface';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { DataState } from 'src/app/data-store/data/data.reducer';
import { AddCard, DeleteCard, EditCard } from 'src/app/data-store/data/data.actions';
import { Card } from 'src/app/models/card.interface';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private store: Store<{ data: DataState }>) {
    this.cardForm = fb.group({
      'cardname': ['', [
        Validators.required,
      ]],
      'front': ['', Validators.required],
      'back': ['', Validators.required],
      'type': ['', Validators.required],
      'hints': ['', Validators.required]
    });
  }

  ngOnInit() {
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
}