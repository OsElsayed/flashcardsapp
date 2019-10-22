import { Card } from './card.interface';
export interface User {
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: string,
  cards: Card[];
}
