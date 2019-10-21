import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { Hint } from 'src/app/models/hint.interface';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  hints: Hint[] = [
    { hint: 'hint1' },
    { hint: 'hint2' },
    { hint: 'hint3' },
  ];
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
}
