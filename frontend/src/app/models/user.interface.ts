import { Card } from './card.interface';
export interface User {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  cards: Card[];
}
