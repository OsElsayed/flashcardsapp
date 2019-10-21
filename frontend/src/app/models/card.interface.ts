import { Hint } from './hint.interface';

export interface Card {
  cardname: String,
  front: String,
  back: String,
  type: String,
  priority: Number,
  hints: Hint[]
}
