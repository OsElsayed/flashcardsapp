
export interface Card {
  cardname: String,
  front: String,
  back: String,
  type: String,
  priority: Number,
  hints: [{
    hint: String
  }]
}
